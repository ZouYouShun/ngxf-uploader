import { HttpParams, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SafeUrl } from '@angular/platform-browser';
import { AlertConfirmService, AlertConfirmModel } from '@shared/components/alert-confirm';
import { PageHeaderService } from '../../page-header/page-header.service';
import { AutoDestory } from '@shared/base/auto.destory';
import { UploaderService } from '@shared/services/uploader.service';
import { FileError, UploadEvent, UploadStatus } from 'ngxf-uploader';
import { environment } from "@env";

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
    private Upload: UploaderService,
    private _alertConfirm: AlertConfirmService,
    private _ps: PageHeaderService) { super(); }


  ngOnInit() {
    this._ps.setTitle('Signal File Uploader');
  }

  // non-multiple, return File
  uploadFile(file: File | FileError): void {
    if (file instanceof File) {
      this.present = 0;
      this.file = file;
      this.Upload.createPreViewImg(this.file, (url) => { this.filePreviewPath = url; });
      return;
    }
    this.file = undefined;
    this.Upload.alertFileError(file);
  }

  startUpload() {
    this.Upload.upload({
      url: `${environment.serverUrl}/file/upload`,
      headers: new HttpHeaders().set('Authorization', 'some-token'),
      params: new HttpParams().set('test', 's'),
      fields: {
        toUrl: 'device'
      },
      filesKey: environment.filesKey,
      files: this.file,
      process: true
    })
      .takeUntil(this._destroy$)
      .subscribe(
      (event: UploadEvent) => {
        if (event.status === UploadStatus.Uploading) {
          this.present = event.percent;
        }
        if (event.status === UploadStatus.Completed) {
          this._alertConfirm.alert(
            new AlertConfirmModel('Data from server', JSON.stringify(event.data), 'success'));
        }
        console.log(event);
      },
      (err: any) => {
      },
      () => {
        // this._alertConfirm.alert('upload success!');
      });

  }
}
