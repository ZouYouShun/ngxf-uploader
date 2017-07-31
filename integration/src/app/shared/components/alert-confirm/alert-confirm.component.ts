import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA, MdDialogConfig } from '@angular/material';
import { AlertConfirmModel } from './alert-confirm.model';
import { DIALOG_TYPE } from './alert-confirm.service';

@Component({
  selector: 'app-alert-confirm',
  templateUrl: './alert-confirm.component.html',
  styleUrls: ['./alert-confirm.component.scss']
})
export class AlertConfirmComponent implements OnInit {

  public classList = {
    success: {
      icon: 'check circle' // cycle ˇ
    },
    warning: {
      icon: 'warning' // triangle !
    },
    info: {
      icon: 'info'  // cycle !
    },
    error: {
      icon: 'highlight_off'  // cycle x
    }
  };
  constructor(public dialogRef: MdDialogRef<AlertConfirmComponent>,
    @Inject(MD_DIALOG_DATA)
    public obj: { data: AlertConfirmModel, type: DIALOG_TYPE }) { }

  ngOnInit() {
    if (!this.obj.data.type) {
      this.obj.data.type = 'info';
    }
  }
}
