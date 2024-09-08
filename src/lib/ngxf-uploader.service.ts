import {
  HttpClient,
  HttpErrorResponse,
  HttpEventType,
  HttpHeaderResponse,
  HttpHeaders,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { catchError, filter, map, Observable } from 'rxjs';

import { UploadEvent, UploadObject, UploadStatus } from './ngxf-uploader.model';
import { NgxfUploadError } from './utils/upload-error';

@Injectable({
  providedIn: 'root',
})
export class NgxfUploaderService {
  private http = inject(HttpClient);

  /**
   * a method provide you to upload file through api easily.
   * @param option that upload detail options
   * @returns `UploadEvent` observable that combine with `status`, `percent`, `data`
   */
  upload(option: UploadObject): Observable<UploadEvent> {
    const {
      files,
      method = 'POST',
      url,
      headers,
      params,
      process,
      filesKey,
      fields,
      ...rest
    } = option;

    if (
      files instanceof Blob ||
      files instanceof File ||
      (files instanceof Array && files.length !== 0)
    ) {
      const uploadData = objectToFormData(option);

      const request = new HttpRequest(method, url, uploadData, {
        headers:
          headers instanceof HttpHeaders ? headers : new HttpHeaders(headers),
        params:
          params instanceof HttpParams
            ? params
            : new HttpParams({ fromObject: params }),
        reportProgress: process,
        ...rest,
      });

      return this.http.request(request).pipe(
        filter((response: any) => {
          if (process) {
            return !(
              response instanceof HttpHeaderResponse ||
              response.type === HttpEventType.DownloadProgress
            );
          }

          return response.type === HttpEventType.Response;
        }),
        map<any, UploadEvent>((event) => {
          switch (event.type) {
            case HttpEventType.Sent:
              return {
                status: UploadStatus.Uploading,
                percent: 0,
              };
            case HttpEventType.UploadProgress:
              return {
                status: UploadStatus.Uploading,
                percent: Math.round((100 * event.loaded) / event.total) || 0,
              };
            case HttpEventType.Response:
              return {
                status: UploadStatus.Completed,
                percent: 100,
                data: event.body,
              };
            default:
              return {} as any;
          }
        }),
        catchError((error: HttpErrorResponse) => {
          throw new NgxfUploadError('uploadError', {
            status: UploadStatus.UploadError,
            data: error.error,
          });
        }),
      );
    }

    throw new NgxfUploadError('uploadError', {
      status: UploadStatus.UploadError,
    });
  }
}

const defaultFileKey = 'file';

function objectToFormData({ fields, files, filesKey }: UploadObject) {
  const data = new FormData();

  // * add fields
  if (fields) {
    Object.keys(fields).forEach((key) => data.append(key, fields[key]));
  }

  // * add files
  if (files instanceof Blob || files instanceof File) {
    data.append(
      (filesKey as string) || defaultFileKey,
      files,
      (files as any)['name'] || 'blob',
    );
  } else {
    for (let i = 0; i < files.length; i++) {
      let key = defaultFileKey;

      // * if it has key
      if (filesKey) {
        if (filesKey instanceof Array) {
          key = filesKey[i % filesKey.length];
        } else {
          key = filesKey;
        }
      }

      data.append(key, files[i], (files[i] as any)['name'] || `blob${i}`);
    }
  }

  return data;
}
