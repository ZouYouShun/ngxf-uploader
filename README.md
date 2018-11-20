
[![NPM version](https://badge.fury.io/js/ngxf-uploader.svg)](http://badge.fury.io/js/ngxf-uploader)

# ngxf-uploader

File uploader for Angular 6+, just use Angular HttpClient, no other dependence. [GitHub](https://github.com/ZouYouShun/ngxf-uploader)

![](https://res.cloudinary.com/dw7ecdxlp/image/upload/v1532609570/ngxfuploader_w7lxqv.gif)

## Description

Select file or Drop file, and return an Observable. You can custom your behavior use [RxJs 6.x](https://github.com/Reactive-Extensions/RxJS) .

Provide an sample way for upload by custom options like header, params, fields, file's form name.

## Example
[https://alanzouhome.firebaseapp.com/package/NgxfUploader](https://alanzouhome.firebaseapp.com/package/NgxfUploader)

## Install

```ts
npm install ngxf-uploader --save
```

+ Import `HttpClientModule`, `NgxfUploaderModule` into your main AppModule or the module where you want use.

```ts
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { NgxfUploaderModule } from 'ngxf-uploader';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxfUploaderModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```
+ Add directive in the template where you want to use.

```html
<!-- select file -->
<button class="btn red cursor-pointer mar-r-1"
  (ngxf-select)="uploadFile($event)">
    Upload Single File
</button>

<!-- drop file -->
<div class="upload-block cursor-pointer"
  (ngxf-select)="uploadFiles($event)"
  (ngxf-drop)="uploadFiles($event)"
  [ngxf-validate]="{min:5000, max:2566621 ,skipInvalid: true}"
  drop-class="drop"
  accept="image/*"
  multiple>
  <div class="mask" style="z-index: 1;">
  </div>
  <mat-icon class="c-white mat-accent" style="z-index: 2;">cloud_upload</mat-icon>
  <h3>Drop file into here or click here to choice file.</h3>
</div>
```

+ Add `NgxfUploaderService` in the constructor and create file upload method in the typescript and upload file to server.

```ts
import { Component } from '@angular/core';
import { FileError, NgxfUploaderService, UploadEvent, UploadStatus } from 'ngxf-uploader';

@Component({
  selector: 'app-drop-file',
  templateUrl: './drop-file.component.html',
  styleUrls: ['./drop-file.component.scss']
})
export class DropFileComponent {

  progress = 0;
  isUploading = false;

  constructor(private Upload: NgxfUploaderService) { }

  uploadFile(file: File | FileError): void {
    console.log(file);
    this.isUploading = true;
    if (!(file instanceof File)) {
      this.alertError(file);
      this.isUploading = false;
      return;
    }
    this.Upload.upload({
      url: 'your api url',
      headers: {
        Authorization: 'token'
      }, // Option
      params: {
        test: '123'
      }, // Option
      fields: { // Option
        toUrl: 'device'
      },
      filesKey: 'fileKey', // Option
      files: file,
      process: true
    }).subscribe(
      (event: UploadEvent) => {
        console.log(event);
        this.progress = event.percent;
        if (event.status === UploadStatus.Completed) {
          alert(`This file upload success!`);
        }
      },
      (err) => {
        console.log(err);
      },
      () => {
        this.isUploading = false;
        console.log('complete');
      });
  }

  uploadFiles(files: File[] | FileError): void {
    console.log(files);
    this.isUploading = true;
    if (!(files instanceof Array)) {
      this.alertError(files);
      this.isUploading = false;
      return;
    }
    this.Upload.upload({
      url: 'your api url',
      headers: {
        Authorization: 'token'
      }, // Option
      params: {
        test: '123'
      }, // Option
      fields: { // Option
        toUrl: 'device'
      },
      filesKey: 'fileKey', // Option
      files: files,
      process: true // if you want process event, set process true
    }).subscribe(
      (event: UploadEvent) => {
        console.log(event);
        this.progress = event.percent;
        if (event.status === UploadStatus.Completed) {
          alert(`upload complete!`);
        }
      },
      (err) => {
        console.log(err);
      },
      () => {
        this.isUploading = false;
        console.log('complete');
      });
  }

  // Do something you want when file error occur.
  alertError(msg: FileError) {
    switch (msg) {
      case FileError.NumError:
        alert('Number Error');
        break;
      case FileError.SizeError:
        alert('Size Error');
        break;
      case FileError.TypeError:
        alert('Type Error');
        break;
    }
  }

}


```
## API

## Attribute Detial
| Attribute | necessary(default) | type | position | description |
| --------- | --------- | ---- | -------- | ----------- |
| `(ngxf-select)` | yes | `(Array)=>File or FileError` | any tag | container to click select file |
| `(ngxf-drop)` | yes | `(Array)=>File[] or FileError` | any tag | container to drop and drag file |
| `[ngxf-validate]` | no | `FileOption` | with `(ngxf-drop)` and `(ngxf-select)` | file validate with file size, and other options|
| `[drop-class]` | no('drop') | `string` | with `(ngxf-drop)` and `(ngxf-select)` | when drop on tag, this class will appent on it |
| `[accept]`  | no | `string` | with `(ngxf-drop)` and `(ngxf-select)` | accept file type |
| `[multiple]` | no | `boolean` | with `(ngxf-drop)` and `(ngxf-select)` | is accet multiple file |

### Service Upload Method
This method will return an Observalbe<UploadEvent>, that you can subscribe it, and return a UploadEvent.
```ts
upload(d: UploadObject): Observable<UploadEvent>;
```

### Upload Object
```ts
export interface UploadObject {
  url: string;
  files: File | File[];
  headers?: { [name: string]: string | string[] } | HttpHeaders;
  params?: { [name: string]: string | string[] } | HttpParams;
  fields?: any;
  filesKey?: string | string[];
  process?: boolean;
  method?: string; // Custom your method Default is POST
}
```

### Return Object
You can use this object when event return.

```ts
export interface UploadEvent {
  status: UploadStatus; // Upload Stauts.
  percent: number; // This upload percent.
  data?: any; // If the data complete, the response will in the data.
}
```

### FileOption
```ts
export interface FileOption {
  // file accept size
  size?: { min?: number, max?: number }; // unit: Byte,
  // deafultis false, when you want to skip the Invalid file, you can set it to true
  skipInvalid?: boolean;
}
```

### FileError
You can use this enum to conclude the file select return.
```ts
export const enum FileError {
  NumError, // when number of file Error.
  TypeError, // when file accept type Error.
  SizeError // when file size error.
}
```

### UploadStatus
You can use this enum to conclude the return Event.
```ts
export const enum UploadStatus {
  Uploading, // when file is uploading.
  Completed, // when upload complete.
  UploadError, // when server error.
  FileNumError // when no choice file.
}
```
