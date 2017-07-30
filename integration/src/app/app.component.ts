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
      fields: {
        toUrl: 'device'
      },
      files: file
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

  // multiple, return FileList
  uploadFileList(files: FileList): void {
    if (!(files instanceof FileList)) {
      this.alertError(files);
      return;
    }

    this.Upload.upload({
      url: 'your upload url',
      fields: {
        toUrl: 'device'
      },
      files: files,
      filesKey: ['key1', 'key2', 'key3'],
      process: true
    }).subscribe(
      (event: UploadEvent) => {
        if (event.status === UploadStatus.Uploading) {
          console.log(event.percent);
        } else {
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
