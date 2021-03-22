import { HttpHeaders, HttpParams } from '@angular/common/http';

export const enum FileError {
  /** when number of file Error */
  NumError,
  /** when file accept type Error */
  TypeError,
  /** when file size error */
  SizeError,
}

export const enum UploadStatus {
  /** when file is uploading */
  Uploading,
  /** when upload complete */
  Completed,
  /** when server error */
  UploadError,
  /** when no choice file */
  FileNumError,
}

export interface UploadObject {
  /** target upload api url */
  url: string;
  /** upload file or files, also support Blob */
  files: File | File[] | Blob | Blob[];
  /**
   * target file key name
   *
   * @default
   * 'file'
   */
  filesKey?: string | string[];
  /** is that need report upload progress,
   *
   * @default
   * false
   */
  process?: boolean;
  /** other fields that you want to attach together */
  fields?: any;
  /** other headers that you want to attach together */
  headers?: { [name: string]: string | string[] } | HttpHeaders;
  /** other params that you want to attach together */
  params?: { [name: string]: string | string[] } | HttpParams;
  /** response type */
  responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
  /**
   * is that with credentials
   *
   * view more:
   *
   * https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials
   */
  withCredentials?: boolean;
  /**
   * request api method type,
   *
   * @default
   * POST
   */
  method?: string;
}

export interface UploadEvent {
  /**
   * upload status
   *
   * - `UploadStatus.Uploading`
   * - `UploadStatus.Completed`
   * - `UploadStatus.UploadError`
   * - `UploadStatus.FileNumError`
   */
  status: UploadStatus;
  /** what percent of current upload rate */
  percent: number;
  /** other data you want to attach */
  data?: any;
}

export interface FileOption {
  /**
   * check upload file size
   * unit: `Byte`
   */
  size?: {
    /** the smallest bytes */
    min?: number;
    /** the biggest bytes */
    max?: number;
  }; // unit: Byte,
  /**
   * when you upload some files in once, but not throw error when have some file not in the range
   * you can set it to true, let will skip the Invalid file
   *
   * @default false
   */
  skipInvalid?: boolean;
}

export interface NgxfUploadDirective {
  /** is that accept multiple files */
  multiple: string;
  /**
   * accept file type
   *
   * @example
   * ```ts
   * accept="image/*"
   * ```
   */
  accept: string;
  /** provide you can validate with files */
  fileOption: FileOption;
}
