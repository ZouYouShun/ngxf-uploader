import { Component, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgxfUploaderService, UploadEvent, UploadStatus } from 'ngxf-uploader';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  process: number[] = [];
  fileData: File;

  constructor(private http: HttpClient, private Upload: NgxfUploaderService) { }

  // non-multiple, return File
  uploadFile(file: File): void {

    this.Upload.upload({
      url: 'http://localhost:3000/file/upload',
      fields: {
        toUrl: 'device'
      },
      files: file,
      process: true
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
  uploadFileList(files: FileList): void {

    this.Upload.upload({
      url: 'http://localhost:3000/file/upload',
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
}

    // const a$ = Observable.create(function (Observer) {
    //   Observer.next('device');
    // }).concatMap(data => {
    //   return Observable.combineLatest([this.u2(files, data), this.u2(files, data)]);
    // });
