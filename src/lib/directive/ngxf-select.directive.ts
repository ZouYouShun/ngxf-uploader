import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  Output,
  Renderer2,
} from '@angular/core';

import { emitOpload } from './file-function';
import { FileError, FileOption } from '../ngxf-uploader.model';

@Directive({
  selector: '[ngxf-select]'
})
export class NgxfSelectDirective implements AfterViewInit, OnDestroy {

  @Output('ngxf-select') uploadOutput = new EventEmitter<File | File[] | FileError>();
  @Input('ngxf-validate') fileOption: FileOption = {};
  @Input() multiple: string;
  @Input() accept: string;

  private fileElm: HTMLInputElement;

  changeListen: () => void;

  constructor(
    private _render: Renderer2,
    private _elm: ElementRef
  ) { }

  @HostListener('click', ['$event']) click() {
    this.bindBeforeClick();

    this.fileElm.click();
  }

  ngAfterViewInit(): void {
    this.fileElm = this._render.createElement('input');
    this._render.setAttribute(this.fileElm, 'type', 'file');
    this._render.setStyle(this.fileElm, 'display', 'none');
    this._render.appendChild(this._elm.nativeElement.parentNode, this.fileElm);
  }

  ngOnDestroy(): void {
    // remove listen
    this.removeListen();
    this._render.removeChild(this._elm.nativeElement.parentNode, this.fileElm);
  }

  // beacuse bind before click, that can change input to change accept and validate
  private bindBeforeClick() {
    if (this.multiple !== undefined) {
      this._render.setAttribute(this.fileElm, 'multiple', '');
    } else {
      this._render.removeAttribute(this.fileElm, 'multiple');
    }
    this._render.setAttribute(this.fileElm, 'accept', this.accept);
    this.removeListen();
    this.changeListen = this._render.listen(this.fileElm, 'change', (e) => {
      // when length is more than 0
      if (this.fileElm.files.length) {
        this.uploadOutput.emit(
          emitOpload(this.fileElm.files, this.accept, this.multiple, this.fileOption)
        );
      }
      this.fileElm.value = '';
      this.removeListen();
    });
  }

  private removeListen() {
    if (this.changeListen) {
      this.changeListen();
    }
  }
}
