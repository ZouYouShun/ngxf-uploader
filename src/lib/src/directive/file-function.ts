export function emitOpload(
  files: FileList,
  accept: string,
  multiple: string) {
  if (multiple === '') {
    if (checkAllFile(files, accept)) {
      return files;
    } else {
      return;
    }
  } else {
    if (files.length === 1 && checkAllFile(files[0], accept)) {
      return files[0];
    } else {
      return;
    }
  }
}

function checkAllFile(file: File | FileList, accept: string) {
  if (accept) {
    if (file instanceof File) {
      return checkfile(file, accept);
    } else {
      return Array.from(file).every((f) => {
        return checkfile(f, accept);
      });
    }
  }
  return true;
}

function checkfile(file: File, accept: string) {

  const acceptedFilesArray = accept.split(',');

  return acceptedFilesArray.some(type => {
    const validType = type.trim();
    if (validType.charAt(0) === '.') {
      return file.name.toLowerCase().endsWith(validType.toLowerCase());
    } else if (/\/\*$/.test(validType)) {
      // This is something like a image/* mime type
      return file.type.replace(/\/.*$/, '') === validType.replace(/\/.*$/, '');
    }
    return file.type === validType;
  });
}
