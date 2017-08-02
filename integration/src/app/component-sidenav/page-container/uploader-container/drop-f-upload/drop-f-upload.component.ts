import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SafeUrl } from '@angular/platform-browser';
import { AlertConfirmService } from '@shared/components/alert-confirm';
import { PageHeaderService } from '../../page-header/page-header.service';
import { AutoDestory } from '@shared/base/auto.destory';
import { UploaderService } from '@shared/services/uploader.service';
import { FileError, UploadEvent, UploadStatus } from 'ngxf-uploader';

@Component({
  selector: 'app-drop-f-upload',
  templateUrl: './drop-f-upload.component.html',
  styleUrls: ['./drop-f-upload.component.scss']
})
export class DropFUploadComponent extends AutoDestory implements OnInit {

  public files: File[];
  public previewUrl: SafeUrl[];
  public present = 0;

  constructor(
    private Upload: UploaderService,
    private _ps: PageHeaderService,
    private _alertConfirm: AlertConfirmService) { super(); }

  ngOnInit() {
    this._ps.setTitle('Drop File Uploader');
  }

  // non-multiple, return File
  uploadFileList(files: File[] | FileError): void {
    if (files instanceof Array) {
      this.present = 0;
      this.files = files;
      this.previewUrl = [];
      files.forEach((f) => {
        this.Upload.createPreViewImg(f, (url) => { this.previewUrl.push(url); });
      });
      return;
    }
    this.files = undefined;
    this.Upload.alertFileError(files);
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
      },
      () => {
        this._alertConfirm.alert('upload success!');
      });
  }

}
