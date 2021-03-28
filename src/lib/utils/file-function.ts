import { FileError, FileOption } from '../ngxf-uploader.model';

export function getUploadResult(
  files: FileList | File[],
  accept: string,
  multiple: string,
  option: FileOption
): File | File[] | FileError {
  if (multiple !== undefined) {
    return checkAllFile(files, accept, option);
  }

  if (files.length === 1) {
    return checkAllFile(files[0], accept, option);
  }
  return FileError.NumError;
}

function checkAllFile(
  file: File | FileList | File[],
  accept: string,
  option: FileOption
): File | File[] | FileError {
  if (file instanceof FileList || file instanceof Array) {
    const files: File[] = [];

    let err: any;

    const allPass = Array.from(file).every((f: File) => {
      const error: File | FileError = checkOneFile(f, accept, option);
      const noError = error instanceof File;

      err = error;

      if (noError) {
        files.push(f);
      }

      // if skipInvalid, all pass
      return option.skipInvalid || noError;
    });

    if (!allPass) {
      return err;
    }

    return files;
  }

  return checkOneFile(file, accept, option);
}

function checkOneFile(file: File, accept: string, option: FileOption) {
  if (!checkFileType(file, accept)) {
    return FileError.TypeError;
  }
  if (!checkFileSize(file, option)) {
    return FileError.SizeError;
  }
  return file;
}

function checkFileType(file: File, accept: string): boolean {
  if (accept) {
    const acceptedFilesArray = accept.split(',');

    return acceptedFilesArray.some((type) => {
      const validType = type.trim();
      if (validType.charAt(0) === '.') {
        return file.name.toLowerCase().endsWith(validType.toLowerCase());
      } else if (/\/\*$/.test(validType)) {
        // This is something like a image/* mime type
        return (
          file.type.replace(/\/.*$/, '') === validType.replace(/\/.*$/, '')
        );
      }
      return file.type === validType;
    });
  }
  return true;
}

function checkFileSize(file: File, option: FileOption): boolean {
  if (option) {
    const size = file.size;
    const chkSize = option.size;
    if (
      chkSize &&
      ((chkSize.min && size < chkSize.min) ||
        (chkSize.max && size > chkSize.max))
    ) {
      return false;
    }
  }
  return true;
}
