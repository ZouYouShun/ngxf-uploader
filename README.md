[![NPM version](https://badge.fury.io/js/ngxf-uploader.svg)](http://badge.fury.io/js/ngxf-uploader)

# ngxf-uploader

File uploader for Angular 6+, just use Angular HttpClient, no other dependence. [GitHub](https://github.com/ZouYouShun/ngxf-uploader)

- ✅ `file` upload
- ✅ `multiple File` upload
- ✅ `accept` support
- ✅ `Progress` support
- ✅ `upload http request` support
- ✅ `folder` upload, thanks for [SHANG-TING](https://github.com/SHANG-TING), more detail  about file upload with folder, can view his [blog](https://scullyio-blog.gofa.cloud/blog/-recursive_file_uploader)

#### Future
- [ ] keep whole folder structure like
```json
[
  {
    "name": "folder name",
    "files": [...files],
    ...other folder metadata
  }
]
```

![](https://res.cloudinary.com/dw7ecdxlp/image/upload/v1532609570/ngxfuploader_w7lxqv.gif)

## Description

Select file or Drop, Paste file, and return an Observable. You can custom your behavior use [RxJs 6.x](https://github.com/Reactive-Extensions/RxJS) .

Provide an sample way for upload by custom options like header, params, fields, file's form name.

## Example

[https://alanzouhome.firebaseapp.com/package/NgxfUploader](https://alanzouhome.firebaseapp.com/package/NgxfUploader)

## Install

```ts
npm install ngxf-uploader --save
```

- Import `HttpClientModule`, `NgxfUploaderModule` into your main AppModule or the module where you want use.

```ts
// app.module.ts
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";

import { NgxfUploaderModule } from "ngxf-uploader";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, NgxfUploaderModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

- Add directive in the template where you want to use.

```html
<!-- select file -->
<button class="btn red cursor-pointer mr-2" (ngxf-select)="uploadFile($event)">
  Upload Single File
</button>

<!-- drop file & parse image -->
<div
  class="upload-block cursor-pointer"
  (ngxf-drop)="uploadFiles($event)"
  (ngxf-parse)="uploadFiles($event)"
  [ngxf-validate]="{size: {min: 5000, max:2566621} ,skipInvalid: true}"
  drop-class="drop"
  accept="image/*"
  multiple
>
  <div class="mask" style="z-index: 1;"></div>
  <mat-icon
    class="c-white mat-accent"
    style="z-index: 2;"
    (ngxf-select)="uploadFiles($event)"
    [ngxf-validate]="{size: {min: 5000, max:2566621} ,skipInvalid: true}"
    accept="image/*"
    multiple
  >
    cloud_upload
  </mat-icon>
  <h3>Drop file and parse image into here or click here to choice file.</h3>
</div>
```

- Add `NgxfUploaderService` in the constructor and create file upload method in the typescript and upload file to server.

```ts
import { Component } from "@angular/core";
import {
  FileError,
  NgxfUploaderService,
  UploadEvent,
  UploadStatus,
} from "ngxf-uploader";

@Component({
  selector: "app-drop-file",
  templateUrl: "./drop-file.component.html",
  styleUrls: ["./drop-file.component.scss"],
})
export class DropFileComponent {
  progress = 0;
  isUploading = false;

  constructor(private Upload: NgxfUploaderService) {}

  uploadFile(file: File | FileError): void {
    console.log(file);
    this.isUploading = true;
    if (!(file instanceof File)) {
      this.alertError(file);
      this.isUploading = false;
      return;
    }
    this.Upload.upload({
      url: "your api url",
      headers: {
        Authorization: "token",
      }, // Option
      params: {
        test: "123",
      }, // Option
      fields: {
        // Option
        toUrl: "device",
      },
      filesKey: "fileKey", // Option
      files: file,
      process: true,
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
        console.log("complete");
      }
    );
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
      url: "your api url",
      headers: {
        Authorization: "token",
      }, // Option
      params: {
        test: "123",
      }, // Option
      fields: {
        // Option
        toUrl: "device",
      },
      filesKey: "fileKey", // Option
      files: files,
      process: true, // if you want process event, set process true
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
        console.log("complete");
      }
    );
  }

  // Do something you want when file error occur.
  alertError(msg: FileError) {
    switch (msg) {
      case FileError.NumError:
        alert("Number Error");
        break;
      case FileError.SizeError:
        alert("Size Error");
        break;
      case FileError.TypeError:
        alert("Type Error");
        break;
    }
  }
}
```

## API

## Attribute Detail

| Attribute         | necessary(default) | type                           | position                               | description                                                      |
| ----------------- | ------------------ | ------------------------------ | -------------------------------------- | ---------------------------------------------------------------- |
| `(ngxf-select)`   | yes                | `(Array)=>File or FileError`   | any tag                                | provide a directive that can let you select file upload by click |
| `(ngxf-drop)`     | yes                | `(Array)=>File[] or FileError` | any tag                                | provide a directive for you to set area can be drop file into    |
| `(ngxf-parse)`    | yes                | `(Array)=>File[] or FileError` | any tag                                | provide a directive for you to set area can be parse file into   |
| `[ngxf-validate]` | no                 | `FileOption`                   | with `(ngxf-drop)` and `(ngxf-select)` | file validate with file size, and other options                  |
| `[drop-class]`    | no('drop')         | `string`                       | with `(ngxf-drop)` and `(ngxf-select)` | when drop on tag, this class will append on it                   |
| `[accept]`        | no                 | `string`                       | with `(ngxf-drop)` and `(ngxf-select)` | accept file type                                                 |
| `[multiple]`      | no                 | `boolean`                      | with `(ngxf-drop)` and `(ngxf-select)` | is allow multiple file                                           |
| `[folder]`        | no                 | `boolean`                      | `(ngxf-select)`                        | is allow select folder file                                           |

### Service Upload Method

This method will return an `Observable<UploadEvent>`, that you can subscribe it, and return a UploadEvent.

```ts
upload(d: UploadObject): Observable<UploadEvent>;
```

### Upload Object

```ts
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
  responseType?: "arraybuffer" | "blob" | "json" | "text";
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
```

### Return Object

You can use this object when event return.

```ts
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
```

### FileOption

```ts
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
```

### FileError

You can use this enum to conclude the file select return.

```ts
export const enum FileError {
  /** when number of file Error */
  NumError,
  /** when file accept type Error */
  TypeError,
  /** when file size error */
  SizeError,
}
```

### UploadStatus

You can use this enum to conclude the return Event.

```ts
export const enum UploadStatus {
  /** when file is uploading. */
  Uploading,
  /** when upload complete. */
  Completed,
  /** when server error. */
  UploadError,
  /** when no choice file. */
  FileNumError,
}
```
