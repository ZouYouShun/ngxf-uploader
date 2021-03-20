import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { FileError, FileOption } from '../ngxf-uploader.model';
import { emitOpload } from './file-function';

@Directive({
  selector: '[ngxf-parse]',
})
export class NgxfParseDirective {
  @Output('ngxf-parse') uploadOutput = new EventEmitter<
    File | File[] | FileError
  >();
  @Input() fileOption: FileOption = {};
  @Input() multiple!: string;
  @Input() accept!: string;

  constructor() {}

  @HostListener('paste', ['$event']) parse(event: ClipboardEvent) {
    const clipboardData = event.clipboardData;

    if (clipboardData?.files.length === 0) {
      return;
    }

    this.uploadOutput.emit(
      emitOpload(
        clipboardData?.files as FileList,
        this.accept,
        this.multiple,
        this.fileOption
      )
    );
  }
}
