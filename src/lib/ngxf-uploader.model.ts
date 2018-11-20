import { HttpHeaders, HttpParams } from '@angular/common/http';

export const enum FileError {
  NumError,
  TypeError,
  SizeError
}

export const enum UploadStatus {
  Uploading,
  Completed,
  UploadError,
  FileNumError
}

export interface UploadObject {
  url: string;
  files: File | File[];
  fields?: any;
  filesKey?: string | string[];

  process?: boolean;
  headers?: { [name: string]: string | string[] } | HttpHeaders;
  params?: { [name: string]: string | string[] } | HttpParams;
  responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
  withCredentials?: boolean;

  method?: string; // Custom your method Default is POST
}

export interface UploadEvent {
  status: UploadStatus;
  percent: number;
  data?: any;
}

export interface FileOption {
  // file accept size
  size?: { min?: number, max?: number }; // unit: Byte,
  // deafultis false, when you want to skip the Invalid file, you can set it to true
  skipInvalid?: boolean;
}
