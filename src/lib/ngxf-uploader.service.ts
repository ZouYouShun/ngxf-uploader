import {
  HttpClient,
  HttpErrorResponse,
  HttpEventType,
  HttpHeaderResponse,
  HttpHeaders,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';

import { UploadEvent, UploadObject, UploadStatus } from './ngxf-uploader.model';

@Injectable({
  providedIn: 'root'
})
export class NgxfUploaderService {

  constructor(private http: HttpClient) { }

  upload(option: UploadObject): Observable<UploadEvent> {
    if (
      (option.files instanceof Blob) ||
      (option.files instanceof File) ||
      (option.files instanceof Array && option.files.length !== 0)) {

      return this.http.request(new HttpRequest(option.method || 'POST', option.url, getFormData(option), {
        headers: option.headers instanceof HttpHeaders ? option.headers : new HttpHeaders(option.headers),
        params: option.params instanceof HttpParams ? option.params : new HttpParams({ fromObject: option.params }),
        reportProgress: option.process,
        responseType: option.responseType,
        withCredentials: option.withCredentials
      })).pipe(
        filter((response: any) => {
          if (option.process) {
            return !(response instanceof HttpHeaderResponse || response.type === HttpEventType.DownloadProgress);
          }
          return (response.type === HttpEventType.Response);
        }),
        map((event) => {
          switch (event.type) {
            case HttpEventType.Sent:
              return {
                status: UploadStatus.Uploading,
                percent: 0
              } as UploadEvent;
            case HttpEventType.UploadProgress:
              return {
                status: UploadStatus.Uploading,
                percent: Math.round((100 * event.loaded) / event.total) || 0
              } as UploadEvent;
            case HttpEventType.Response:
              return {
                status: UploadStatus.Completed,
                percent: 100,
                data: event.body
              } as UploadEvent;
            default:
              return {} as UploadEvent;
          }
        }),
        catchError((error: HttpErrorResponse) => {
          return throwError(<UploadEvent>{
            status: UploadStatus.UploadError,
            data: error.error
          });
        })
      );
    }

    return throwError(<UploadEvent>{ status: UploadStatus.FileNumError });
  }
}

function getFormData(option: UploadObject) {

  const data = new FormData();

  if (option.fields) {
    Object.keys(option.fields).forEach(key => data.append(key, option.fields[key]));
  }

  if ((option.files instanceof Blob) || (option.files instanceof File)) {
    data.append(<string>option.filesKey || 'file', option.files, (option.files as any)['name'] || 'blob');
  } else {
    for (let i = 0; i < option.files.length; i++) {

      let key = 'file';

      // If it has key
      if (option.filesKey) {
        if (option.filesKey instanceof Array) {
          key = option.filesKey[i % option.filesKey.length];
        } else {
          key = option.filesKey;
        }
      }
      data.append(key, option.files[i], (option.files[i] as any)['name'] || `blob${i}`);
    }
  }

  return data;
}
