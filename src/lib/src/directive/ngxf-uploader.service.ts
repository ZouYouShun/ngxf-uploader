import {
  HttpErrorResponse,
  HttpHeaderResponse,
  HttpEventType,
  HttpRequest,
  HttpClient
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NgxfUploaderService {

  constructor(private http: HttpClient) { }

  upload(d: UploadObject): Observable<any> {
    if ((d.files instanceof File) || (d.files instanceof Array && d.files.length !== 0)) {
      const ufData = new FormData();

      if (d.files instanceof File) {
        ufData.append(<string>d.filesKey || 'file', d.files, d.files.name);
      } else {
        for (let i = 0; i < d.files.length; i++) {

          let key = 'file';

          // If it has key
          if (d.filesKey) {
            if (d.filesKey instanceof Array) {
              key = d.filesKey[i % d.filesKey.length];
            } else {
              key = d.filesKey;
            }
          }
          ufData.append(key, d.files[i], d.files[i].name);
        }
      }

      if (d.fields) {
        Object.keys(d.fields).forEach(key => ufData.append(key, d.fields[key]));
      }

      const req = new HttpRequest(d.method || 'POST', d.url, ufData, {
        reportProgress: d.process,
      });

      return this.http.request(req)
        .filter((r: any) => {
          if (d.process) {
            return !(r instanceof HttpHeaderResponse || r.type === HttpEventType.DownloadProgress);
          }
          return (r.type === HttpEventType.Response);
        })
        .map((event: any) => {
          switch (event.type) {
            case HttpEventType.Sent:
              return <UploadEvent>{
                status: UploadStatus.Uploading,
                percent: 0
              };
            case HttpEventType.UploadProgress:
              return <UploadEvent>{
                status: UploadStatus.Uploading,
                percent: Math.round(100 * event.loaded / event.total) || 0
              };
            case HttpEventType.Response:
              return <UploadEvent>{
                status: UploadStatus.Completed,
                percent: 100,
                data: event.body
              };
          }
        })
        .catch((error: HttpErrorResponse) => {
          return Observable.throw(<UploadEvent>{
            status: UploadStatus.UploadError,
            data: error.error
          });
        });
    } else {
      return Observable
        .throw(<UploadEvent>{
          status: UploadStatus.FileNumError
        }).map((error: any) => error);
    }
  }
}
export enum FileError {
  NumError,
  TypeError,
  SizeError
}
// NumError = 'Number Error',
// TypeError = 'Type Error',
// SizeError = 'Size Error'

export enum UploadStatus {
  Uploading,
  Completed,
  UploadError,
  FileNumError
}

export interface UploadObject {
  url: string;
  fields: any;
  files: File | File[];
  filesKey?: string | string[];
  process?: boolean;
  method?: string; // Custom your method Default is POST
}

export interface UploadEvent {
  status: UploadStatus;
  percent: number;
  data?: any;
}

export interface FileOption {
  size: { min?: number, max?: number }; // unit: Byte
}
