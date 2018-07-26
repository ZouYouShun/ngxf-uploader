import { Directive, EventEmitter, Output, Input, HostListener, Renderer2, AfterViewInit, OnDestroy } from '@angular/core';

import { emitOpload } from './file-function';
import { FileOption, FileError, NgxfUploaderService } from './ngxf-uploader.service';

@Directive({
  selector: '[ngxf-select]'
})
export class NgxfSelectDirective implements AfterViewInit, OnDestroy {

  @Output('ngxf-select') uploadOutput = new EventEmitter<File | File[] | FileError>();
  @Input('ngxf-validate') fileOption: FileOption = {};
  @Input() multiple: string;
  @Input() accept: string;


  constructor(
    private _render: Renderer2,
    private _service: NgxfUploaderService
  ) { }

  @HostListener('click', ['$event']) public click() {
    this.bindBeforeClick();

    this._service.fileElm.click();
  }

  private bindBeforeClick() {
    if (this.multiple !== undefined) {
      this._render.setAttribute(this._service.fileElm, 'multiple', '');
    } else {
      this._render.removeAttribute(this._service.fileElm, 'multiple');
    }
    this._render.setAttribute(this._service.fileElm, 'accept', this.accept);
    this.removeListen();
    this._service.changeListen = this._render.listen(this._service.fileElm, 'change', (e) => {
      // when length is more than 0
      if (this._service.fileElm.files.length) {
        this.uploadOutput.emit(
          emitOpload(this._service.fileElm.files, this.accept, this.multiple, this.fileOption)
        );
      }
      this._service.fileElm.value = '';
      this._service.changeListen();
    });
  }

  ngAfterViewInit(): void {

    if (!this._service.fileElm) {
      this._service.fileElm = this._render.createElement('input');
      this._render.setAttribute(this._service.fileElm, 'type', 'file');
    }
  }

  ngOnDestroy(): void {
    // remove listen
    this.removeListen();
  }

  private removeListen() {
    if (this._service.changeListen) {
      this._service.changeListen();
    }
  }
}
