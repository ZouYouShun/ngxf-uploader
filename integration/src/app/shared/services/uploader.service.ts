import { Injectable } from '@angular/core';
import { UploadObject, FileError, NgxfUploaderService, UploadEvent, UploadStatus } from 'ngxf-uploader';
import { AlertConfirmService } from '@shared/components/alert-confirm';
import { Observable } from 'rxjs/Observable';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class UploaderService {

  constructor(
    private _sanitizer: DomSanitizer,
    private _upload: NgxfUploaderService,
    private _alertConfirm: AlertConfirmService) { }


  upload(d: UploadObject): Observable<any> {
    return this._upload.upload(d)
      .catch((e: UploadEvent) => {
        this.alertUploadError(e.status);
        return Observable.throw(e);
      });
  }

  private alertUploadError(msg: UploadStatus) {
    switch (msg) {
      case UploadStatus.UploadError:
        this._alertConfirm.alert('Upload Error!');
        break;
      case UploadStatus.FileNumError:
        this._alertConfirm.alert('File Num Error!');
        break;
    }
  }

  createPreViewImg(file: File, callbake: Function) {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      return callbake(e.target.result);
    };
    reader.readAsDataURL(file);

    // return this._sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
  }

  alertFileError(msg: FileError) {
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
