import { Injectable } from '@angular/core';
import { MdDialog, MdDialogConfig } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { AlertConfirmComponent } from './alert-confirm.component';
import { ConfirmCallback, AlertCallback, AlertConfirmModel } from './alert-confirm.model';

@Injectable()
export class AlertConfirmService {

  private alertCallback: AlertCallback;
  private confirmCallback: ConfirmCallback;
  constructor(private dialog: MdDialog) { }

  confirm(obj: AlertConfirmModel | string): ConfirmCallback {
    this.openDialog(obj, DIALOG_TYPE.CONFIRM);
    this.confirmCallback = new ConfirmCallback();
    return this.confirmCallback;
  }

  alert(obj: AlertConfirmModel | string): AlertCallback {
    this.openDialog(obj, DIALOG_TYPE.ALERT);
    this.alertCallback = new AlertCallback();
    return this.alertCallback;
  }

  private openDialog(obj: AlertConfirmModel | string, type: DIALOG_TYPE): void {
    if (typeof (obj) === 'string') {
      obj = new AlertConfirmModel(null, obj);
    }

    const dialogRef =
      this.dialog
        .open(AlertConfirmComponent, {
          width: '50%',
          data: {
            data: obj,
            type: type
          },
          disableClose: obj.disableClose
        });

    dialogRef.afterClosed()
      .subscribe((result: boolean) => {
        if (type === DIALOG_TYPE.CONFIRM) {
          if (!result) {
            return this.confirmCallback._cancel();
          }
          return this.confirmCallback._ok();
        }
        return this.alertCallback._ok();
      });
  }
}

export enum DIALOG_TYPE {
  ALERT,
  CONFIRM
}
