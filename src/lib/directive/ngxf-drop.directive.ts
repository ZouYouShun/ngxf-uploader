import { Directive, EventEmitter, Output, Input, HostListener, ElementRef, Renderer2 } from '@angular/core';

import { emitOpload } from './file-function';
import { FileOption, FileError } from './ngxf-uploader.service';

@Directive({
  selector: '[ngxf-drop]'
})
export class NgxfDropDirective {

  @Output('ngxf-drop') uploadOutput = new EventEmitter<File | File[] | FileError>();
  @Input('ngxf-validate') fileOption: FileOption = {};
  @Input('drop-class') dropClass = 'drop';
  @Input() multiple: string;
  @Input() accept: string;

  constructor(
    private _elm: ElementRef,
    private _render: Renderer2
  ) { }


  @HostListener('drop', ['$event']) public drop(e: any) {
    this.stopEvent(e);
    this._render.removeClass(this._elm.nativeElement, this.dropClass);

    this.uploadOutput.emit(
      emitOpload(e.dataTransfer.files, this.accept, this.multiple, this.fileOption)
    );
  }

  @HostListener('dragover', ['$event'])
  @HostListener('dragenter', ['$event']) public dragenter(e: Event) {
    this.stopEvent(e);
    this._render.addClass(this._elm.nativeElement, this.dropClass);
  }

  @HostListener('dragleave', ['$event']) public dragleave(e: Event) {
    this.stopEvent(e);
    this._render.removeClass(this._elm.nativeElement, this.dropClass);
  }

  // prevent the file open event
  stopEvent(e: Event) {
    e.stopPropagation();
    e.preventDefault();
  }

}
