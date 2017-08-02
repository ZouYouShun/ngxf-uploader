import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SafeUrl } from '@angular/platform-browser';
import { AlertConfirmService, AlertConfirmModel } from '@shared/components/alert-confirm';
import { PageHeaderService } from '../../page-header/page-header.service';
import { AutoDestory } from '@shared/base/auto.destory';
import { UploaderService } from '@shared/services/uploader.service';
import { FileError, UploadEvent, UploadStatus } from 'ngxf-uploader';
import { environment } from '@env';
import { BlockViewService } from '@shared/components/block-view/block-view.service';

@Component({
  selector: 'app-multi-f-upload',
  templateUrl: './multi-f-upload.component.html',
  styleUrls: ['./multi-f-upload.component.scss']
})
export class MultiFUploadComponent extends AutoDestory implements OnInit {

  public files: File[];
  public previewUrl: SafeUrl[];

  public present = 0;

  constructor(
    private Upload: UploaderService,
    private _alertConfirm: AlertConfirmService,
    private _ps: PageHeaderService,
    private _block: BlockViewService) { super(); }

  ngOnInit() {
    this._ps.setTitle('Multiple File Uploader');
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
    this._block.block('uploading...');
    this.Upload.upload({
      url: `${environment.serverUrl}/file/upload`,
      fields: {
        toUrl: 'device'
      },
      files: this.files,
      filesKey: environment.filesKey,
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
        this._block.unblock();
      },
      () => {
        this._block.unblock();
        // this._alertConfirm.alert('upload success!');
      });
  }

}
