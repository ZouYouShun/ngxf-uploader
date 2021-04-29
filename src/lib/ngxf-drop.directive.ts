import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  Renderer2,
} from '@angular/core';

import {
  FileError,
  FileOption,
  NgxfDirectoryStructure,
  NgxfUploadDirective,
} from './ngxf-uploader.model';
import { getFilesFromGetAsEntry, getUploadResult } from './utils';

const stopEvent = (e: Event) => {
  e.stopPropagation();
  e.preventDefault();
};

/**
 * provide a directive for you to set area can be drop file into
 */
@Directive({
  selector: '[ngxf-drop]',
})
export class NgxfDropDirective implements NgxfUploadDirective {
  /** when get drop file into area that will trigger */
  @Output('ngxf-drop') onUpload = new EventEmitter<
    File | File[] | NgxfDirectoryStructure[] | FileError
  >();

  @Input('ngxf-validate') fileOption: FileOption = {};
  @Input() multiple!: string;
  @Input() accept!: string;
  @Input() structure!: NgxfUploadDirective['structure'];

  /**
   * add class when drop into this drop area
   * @default 'drop'
   */
  @Input('drop-class') dropClass = 'drop';

  constructor(private _elm: ElementRef, private _render: Renderer2) {}

  @HostListener('drop', ['$event']) async drop(e: DragEvent) {
    stopEvent(e);

    this._render.removeClass(this._elm.nativeElement, this.dropClass);

    let files: FileList | File[];
    try {
      files = await getFilesFromGetAsEntry(e);
    } catch (error) {
      files = e.dataTransfer.files;
    }

    const result = getUploadResult(
      files,
      this.accept,
      this.multiple,
      this.fileOption,
      this.structure
    );

    this.onUpload.emit(result);
  }

  @HostListener('dragover', ['$event'])
  @HostListener('dragenter', ['$event'])
  dragenter(e: Event) {
    stopEvent(e);
    this._render.addClass(this._elm.nativeElement, this.dropClass);
  }

  @HostListener('dragleave', ['$event']) dragleave(e: Event) {
    stopEvent(e);
    this._render.removeClass(this._elm.nativeElement, this.dropClass);
  }
}
