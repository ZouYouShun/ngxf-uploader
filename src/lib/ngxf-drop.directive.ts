import {
  Directive,
  ElementRef,
  HostListener,
  Renderer2,
  inject,
} from '@angular/core';

import {
  FileError,
  FileValidateOptions,
  NgxfDirectoryStructure,
  NgxfUploadDirective,
  NgxfUploadFolder,
} from './ngxf-uploader.model';
import { getFilesFromGetAsEntry, getUploadResult } from './utils';
import { input } from '@angular/core';
import { output } from '@angular/core';

const stopEvent = (e: Event) => {
  e.stopPropagation();
  e.preventDefault();
};

/**
 * provide a directive for you to set area can be drop file into
 */
@Directive({
  selector: '[ngxf-drop]',
  standalone: true,
})
export class NgxfDropDirective implements NgxfUploadDirective {
  private _elm = inject(ElementRef);
  private _render = inject(Renderer2);
  /** when get drop file into area that will trigger */
  onUpload = output<File | File[] | NgxfDirectoryStructure[] | FileError>({
    alias: 'ngxf-drop',
  });

  fileOption = input<FileValidateOptions>({}, { alias: 'ngxf-validate' });
  multiple = input<boolean | undefined>();
  accept = input<string | undefined>();
  structure = input<NgxfUploadFolder>();

  /**
   * add class when drop into this drop area
   * @default 'drop'
   */
  dropClass = input('drop', { alias: 'drop-class' });

  @HostListener('drop', ['$event']) async drop(e: DragEvent) {
    stopEvent(e);

    this._render.removeClass(this._elm.nativeElement, this.dropClass());

    let files: FileList | File[] | undefined;
    try {
      files = await getFilesFromGetAsEntry(e);
    } catch (error) {
      files = e.dataTransfer?.files;
    }

    if (!files) return;

    const result = getUploadResult(
      files,
      this.accept() || '',
      this.multiple(),
      this.fileOption(),
      this.structure(),
    );

    this.onUpload.emit(result);
  }

  @HostListener('dragover', ['$event'])
  @HostListener('dragenter', ['$event'])
  dragenter(e: Event) {
    stopEvent(e);
    this._render.addClass(this._elm.nativeElement, this.dropClass());
  }

  @HostListener('dragleave', ['$event']) dragleave(e: Event) {
    stopEvent(e);
    this._render.removeClass(this._elm.nativeElement, this.dropClass());
  }
}
