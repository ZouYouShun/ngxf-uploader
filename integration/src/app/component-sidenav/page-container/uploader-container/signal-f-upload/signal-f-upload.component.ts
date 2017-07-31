import { Component, OnInit } from '@angular/core';
import { NgxfUploaderService, UploadEvent, UploadStatus, FileError } from 'ngxf-uploader';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AlertConfirmService, AlertConfirmModel } from '../../../../shared/components/alert-confirm';

@Component({
  selector: 'app-signal-f-upload',
  templateUrl: './signal-f-upload.component.html',
  styleUrls: ['./signal-f-upload.component.scss']
})
export class SignalFUploadComponent implements OnInit {

  public myForm: FormGroup;
  public file: File;
  public filePreviewPath: SafeUrl;

  public present = 0;

  constructor(
    private Upload: NgxfUploaderService,
    private _alertConfirm: AlertConfirmService,
    private _sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.myForm = new FormGroup({
      file: new FormControl(this.file, Validators.required),
      lastName: new FormControl(null, Validators.required),
    });
  }

  // non-multiple, return File
  uploadFile(file: File | FileError): void {
    if (file instanceof File) {
      console.log(file);
      this.file = file;
      this.filePreviewPath = this._sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.file));
      return;
    }
    this.file = undefined;
    this.alertError(file);
  }

  startUpload() {
    this.present = 0;
    this.Upload.upload({
      url: 'http://localhost:3000/file/upload',
      fields: {
        toUrl: 'device'
      },
      files: this.file,
      filesKey: 'MMSUploadFile',
      process: true
    }).subscribe(
      (event: UploadEvent) => {
        if (event.status === UploadStatus.Uploading) {
          this.present = event.percent;
        }
      },
      (err: any) => {
        this._alertConfirm.alert('upload fail!');
      },
      () => {
        this._alertConfirm.alert('upload success!');
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
