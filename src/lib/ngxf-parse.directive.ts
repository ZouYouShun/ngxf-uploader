import { Directive, HostListener, input, output } from '@angular/core';

import {
  FileError,
  FileValidateOptions,
  NgxfDirectoryStructure,
  NgxfUploadDirective,
  NgxfUploadFolder,
} from './ngxf-uploader.model';
import { getUploadResult } from './utils';

/**
 * provide a directive for you to set area can be parse file into
 */
@Directive({
  selector: '[ngxf-parse]',
  standalone: true,
})
export class NgxfParseDirective implements NgxfUploadDirective {
  /** when get parse file that will trigger */
  uploadOutput = output<File | File[] | NgxfDirectoryStructure[] | FileError>({
    alias: 'ngxf-parse',
  });

  fileOption = input<FileValidateOptions>({}, { alias: 'ngxf-validate' });
  multiple = input<boolean | undefined>();
  accept = input<string | undefined>();
  structure = input<NgxfUploadFolder>();

  @HostListener('paste', ['$event']) parse(event: ClipboardEvent) {
    const clipboardData = event.clipboardData;

    if (clipboardData?.files.length === 0) return;

    const result = getUploadResult(
      clipboardData?.files as FileList,
      this.accept() || '',
      this.multiple(),
      this.fileOption(),
      this.structure(),
    );

    this.uploadOutput.emit(result);
  }
}
