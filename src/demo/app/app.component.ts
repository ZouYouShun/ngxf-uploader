import { HttpHeaders, HttpParams } from '@angular/common/http';
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
      url: 'http://localhost:3000/file/upload',
      headers: new HttpHeaders().set('Authorization', 'some-token'),
      params: new HttpParams().set('test', 's'),
      fields: {
        toUrl: 'device'
      },
      filesKey: ['MMSUploadFile'],
      files: file
    }).subscribe(
      (event: UploadEvent) => {
        if (event.status === UploadStatus.Uploading) {
          console.log(event.percent);
        } else {
          console.log(event);
        }
      },
      (err: any) => {
        console.log(err);
      },
      () => {
        console.log('complete');
      });
  }

  // multiple, return FileList
  uploadFileList(files: File[] | FileError): void {
    if (!(files instanceof Array)) {
      this.alertError(files);
      return;
    }

    this.Upload.upload({
      url: 'http://localhost:3000/file/upload',
      headers: { Authorization: 'some-token' },
      params: { test: 'sss', ssss: 'ddd' },
      fields: {
        toUrl: 'device'
      },
      files: files,
      // filesKey: ['MMSUploadFile', 'aaa', 'bbb'],
      filesKey: ['MMSUploadFile'],
      process: true
    }).subscribe(
      (event: UploadEvent) => {
        console.log(event);
      },
      (err: any) => {
        console.log(err);
      },
      () => {
        console.log('complete');
      });
  }

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
