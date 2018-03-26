# ngxf-uploader

File uploader for Angular 4.3+, just use Angular HttpClient, no other dependence.
[GitHub](https://github.com/ZouYouShun/ngxf-uploader)

## Description

Select file or Drop file, and return an Observable. You can custom your behavior use [RxJs 5.x](https://github.com/Reactive-Extensions/RxJS) .

Provide an sample way for upload by custom options like header, params, fields, file's form name.

## Example
[heroku Example](https://ngxf-uploader.herokuapp.com/)

```ts
cd integration
npm install
npm start
```

## Install

```ts
npm install ngxf-uploader --save
```

+ Import `HttpClientModule` and RxJs into your main AppModule, and `NgxfUploaderModule` into your main AppModule or in module where you want use. 

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
    NgxfUploaderModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```
+ Add directive in the template where you want to use.

```html
<div class="block"
     (ngxf-drop)="uploadFileList($event)"
     drop-class="drop"
     accept="image/*,.svg"
     multiple
     [ngxf-validate]="{ size: { min: 50000, max:1000000 } }">
  <label class="upload-button">
    <input type="file"
          (ngxf-select)="uploadFile($event)"
          [ngxf-validate]="{ size: { min: 50000, max:1000000 } }"
          accept="image/*,.svg,.ttt" >
    choice file.
  </label>

   <label class="upload-button">
    <input type="file" (ngxf-select)="uploadFileList($event)" multiple accept="image/*,.mp3">
    choic files
  </label>
</div>
```

+ Add `NgxfUploaderService` in the constructor and create file upload method in the typescript and upload file to server.

```ts
import { Component, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgxfUploaderService, UploadEvent, UploadStatus, FileError } from 'ngxf-uploader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  process: number[] = [];
  fileData: File;

  constructor(private Upload: NgxfUploaderService) { }

  // non-multiple, return File
  uploadFile(file: File | FileError): void {
    if (!(file instanceof File)) {
      this.alertError(file);
      return;
    }
    this.Upload.upload({
      url: 'your upload url',
      headers: new HttpHeaders().set('Authorization', 'some-token'), //Option
      params: new HttpParams().set('test', '123'), //Option
      fields: { //Option
        toUrl: 'device'
      },
      filesKey: 'MMSUploadFile', //Option
      files: file,
      process: true
    }).subscribe(
      (event: UploadEvent) => {
        console.log(event);
      },
      (err) => {
        console.log(err);
      },
      () => {
        console.log('complete');
      });
  }

  // multiple, return  File[]
  uploadFileList(files: File[]): void {
    if (!(files instanceof Array)) {
      this.alertError(files);
      return;
    }

    this.Upload.upload({
      url: 'your upload url',
      headers: { Authorization: 'some-token' },
      params: { test: 'aaa', test2: 'bbb' },
      fields: {
        toUrl: 'device'
      },
      files: files,      
      filesKey: ['key1','key2','key3'],
      process: true
    }).subscribe(
      (event: UploadEvent) => {
        if (event.status === UploadStatus.Uploading) {
          console.log(event.percent);
        }else{
          console.log(event);
        }
      },
      (err) => {
        console.log(err);
      },
      () => {
        console.log('complete');
      });
  }

  //Do something you want when file error occur.
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
## Template Directive

### Select
Add this directive on the input[type='file'].
```html
    <input type="file"
          (ngxf-select)="uploadFile($event)"
          [ngxf-validate]="{ size: { min: 50000, max:1000000 } }"
          accept="image/*,.svg"
          multiple >
```
#### attribute
```ts
(ngxf-select)="uploadFile($event)"  // Method, add this on where you want to select file.
[ngxf-validate]="{ size: { min: 50000, max:1000000 } }" // FileOption, set allow size  
accept="image/*,.svg" // String, can accept file like file accept 
multiple // none, if you want to choice multiple file, add this attribute
```

[IANA Media Types](https://www.iana.org/assignments/media-types/media-types.xhtml)


### Drop
Add this directive where you want drop in.
```html
    <div class="block"
     (ngxf-drop)="uploadFileList($event)"
     drop-class="drop"
     accept="image/*,.svg"
     multiple
     [ngxf-validate]="{ size: { min: 50000, max:1000000 } }">Drop Area</div>
```
#### attribute
```ts
(ngxf-drop)="uploadFileList($event)"  // Method, add this on where you want to drop file in.
[ngxf-validate]="{ size: { min: 50000, max:1000000 } }" // FileOption, set allow size  
drop-class="drop" //String, class name when your file drop over, this class will append on element.
accept="image/*,.svg" // String, can accept file like file accept 
multiple // none, if you want to choice multiple file, add this attribute
```

## API

### Service Upload Method
This method will return an Observalbe<any>, that you can subscribe it, and return a UploadEvent.
```ts
upload(d: UploadObject): Observable<any>;
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
  size: { min?: number, max?: number }; // unit: Byte
}
```

### FileError
You can use this enum to conclude the file select return.
```ts
export const enum FileError {
  NumError,
  TypeError,
  SizeError
}
```

### UploadStatus
You can use this enum to conclude the return Event.
```ts
export const enum UploadStatus {
  Uploading,
  Completed,
  UploadError, // When server error.
  FileNumError // When no choice file.
}
```
