import { Component, OnInit } from '@angular/core';
import { NgxfUploaderService, UploadEvent, UploadStatus, FileError } from 'ngxf-uploader';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AlertConfirmService, AlertConfirmModel } from '@shared/components/alert-confirm';
import { PageHeaderService } from '../../page-header/page-header.service';
import { AutoDestory } from '@shared/base/auto.destory';

@Component({
  selector: 'app-signal-f-upload',
  templateUrl: './signal-f-upload.component.html',
  styleUrls: ['./signal-f-upload.component.scss']
})
export class SignalFUploadComponent extends AutoDestory implements OnInit {

  public myForm: FormGroup;
  public file: File;
  public filePreviewPath: SafeUrl;

  public present = 0;

  constructor(
    private Upload: NgxfUploaderService,
    private _alertConfirm: AlertConfirmService,
    private _sanitizer: DomSanitizer,
    private _ps: PageHeaderService) { super(); }

  ngOnInit() {
    this._ps.setTitle('Signal File Uploader');
    this.myForm = new FormGroup({
      file: new FormControl(this.file, Validators.required)
    });
  }

  // non-multiple, return File
  uploadFile(file: File | FileError): void {
    if (file instanceof File) {
      this.present = 0;
      this.file = file;
      this.filePreviewPath = this._sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.file));
      return;
    }
    this.file = undefined;
    this.alertError(file);
  }

  startUpload() {
    this.Upload.upload({
      url: 'http://localhost:3000/file/upload',
      fields: {
        toUrl: 'device'
      },
      files: this.file,
      filesKey: 'MMSUploadFile',
      process: true
    })
      .takeUntil(this._destroy$)
      .subscribe(
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
        this._alertConfirm.alert('Number Error');
        break;
      case FileError.SizeError:
        this._alertConfirm.alert('Size Error');
        break;
      case FileError.TypeError:
        this._alertConfirm.alert('Type Error');
        break;
    }
  }
}
