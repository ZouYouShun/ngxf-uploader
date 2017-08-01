import { Component, OnInit } from '@angular/core';
import { NgxfUploaderService, UploadEvent, UploadStatus, FileError } from 'ngxf-uploader';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AlertConfirmService, AlertConfirmModel } from '@shared/components/alert-confirm';
import { PageHeaderService } from '../../page-header/page-header.service';
import { AutoDestory } from '@shared/base/auto.destory';

@Component({
  selector: 'app-multi-f-upload',
  templateUrl: './multi-f-upload.component.html',
  styleUrls: ['./multi-f-upload.component.scss']
})
export class MultiFUploadComponent extends AutoDestory implements OnInit {

  public myForm: FormGroup;
  public files: File[] = [];
  public previewUrl: SafeUrl[];

  public present = 0;

  constructor(
    private Upload: NgxfUploaderService,
    private _alertConfirm: AlertConfirmService,
    private _sanitizer: DomSanitizer,
    private _ps: PageHeaderService) { super(); }

  ngOnInit() {
    this._ps.setTitle('Multiple File Uploader');
  }

  // non-multiple, return File
  uploadFileList(files: File[] | FileError): void {
    if (files instanceof Array) {
      this.present = 0;
      this.files = files;
      this.previewUrl = files.map((f) => {
        return this.fileUrl(f);
      });
      console.log(this.files);
      return;
    }
    this.files = undefined;
    this.alertError(files);
  }

  startUpload() {
    this.Upload.upload({
      url: 'http://localhost:3000/file/upload',
      fields: {
        toUrl: 'device'
      },
      files: this.files,
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

  fileUrl(file: File) {
    return this._sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
  }
}
