import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

import {
  FileError,
  FileOption,
  NgxfDirectoryStructure,
  NgxfUploadDirective,
} from './ngxf-uploader.model';
import { getUploadResult } from './utils';

/**
 * provide a directive for you to set area can be parse file into
 */
@Directive({
  selector: '[ngxf-parse]',
})
export class NgxfParseDirective implements NgxfUploadDirective {
  /** when get parse file that will trigger */
  @Output('ngxf-parse') uploadOutput = new EventEmitter<
    File | File[] | NgxfDirectoryStructure[] | FileError
  >();

  @Input('ngxf-validate') fileOption: FileOption = {};
  @Input() multiple!: string;
  @Input() accept!: string;
  @Input() structure!: NgxfUploadDirective['structure'];

  @HostListener('paste', ['$event']) parse(event: ClipboardEvent) {
    const clipboardData = event.clipboardData;

    if (clipboardData?.files.length === 0) return;

    const result = getUploadResult(
      clipboardData?.files as FileList,
      this.accept,
      this.multiple,
      this.fileOption,
      this.structure
    );

    this.uploadOutput.emit(result);
  }
}
