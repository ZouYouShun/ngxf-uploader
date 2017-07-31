export class AlertConfirmModel {
  constructor(
    public title: string,
    public message: any,
    public type?: 'success' | 'warning' | 'info' | 'error',
    public disableClose?: boolean) {
    this.title = title;
    if (typeof (this.message) === 'object') {
      this.message = this.message.message;
    } else {
      this.message = message;
    }
    this.type = this.type;
    this.disableClose = this.disableClose;
  }
}

export class AlertCallback {

  _ok: Function = function () { };

  ok(ok: Function): void {
    this._ok = ok;
  }
}

export class ConfirmCallback {
  _ok: Function = function () { };
  _cancel: Function = function () { };

  ok(ok: Function): ConfirmCallback {
    this._ok = ok;
    return this;
  }

  cancel(cancel: Function): ConfirmCallback {
    this._cancel = cancel;
    return this;
  }
}
