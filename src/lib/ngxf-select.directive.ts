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

import {
  FileError,
  FileOption,
  NgxfDirectoryStructure,
  NgxfUploadDirective,
} from './ngxf-uploader.model';
import { getUploadResult } from './utils';

/**
 * provide a directive that can let you select file upload by click
 */
@Directive({
  selector: '[ngxf-select]',
})
export class NgxfSelectDirective
  implements AfterViewInit, OnDestroy, NgxfUploadDirective {
  /** when use select some files end, that will trigger */
  @Output('ngxf-select') uploadOutput = new EventEmitter<
    File | File[] | NgxfDirectoryStructure[] | FileError
  >();
  @Input('ngxf-validate') fileOption: FileOption = {};
  @Input() multiple!: string;
  @Input() accept!: string;
  /** is that is select folder mode, only work when `multiple` also be `true` */
  @Input() folder!: boolean;
  @Input() structure!: NgxfUploadDirective['structure'];

  private fileElm!: HTMLInputElement;

  changeListen!: () => void;

  constructor(private _render: Renderer2, private _elm: ElementRef) {}

  @HostListener('click') click() {
    this.bindBeforeClick();

    this.fileElm.click();
  }

  ngAfterViewInit(): void {
    this.fileElm = this._render.createElement('input');
    this._render.setAttribute(this.fileElm, 'type', 'file');
    this._render.setStyle(this.fileElm, 'display', 'none');

    if (this.folder !== undefined && this.multiple !== undefined) {
      this._render.setAttribute(this.fileElm, 'webkitdirectory', '');
    }

    this._render.appendChild(this._elm.nativeElement.parentNode, this.fileElm);
  }

  ngOnDestroy(): void {
    this.changeListen?.();
    this._render.removeChild(this._elm.nativeElement.parentNode, this.fileElm);
  }

  // because bind before click, that can change input to change accept and validate
  private bindBeforeClick() {
    if (this.multiple !== undefined) {
      this._render.setAttribute(this.fileElm, 'multiple', '');
    } else {
      this._render.removeAttribute(this.fileElm, 'multiple');
    }

    this._render.setAttribute(this.fileElm, 'accept', this.accept);

    this.changeListen?.();

    this.changeListen = this._render.listen(this.fileElm, 'change', (e) => {
      // when length is more than 0
      if (this.fileElm?.files?.length) {
        const result = getUploadResult(
          this.fileElm.files,
          this.accept,
          this.multiple,
          this.fileOption,
          this.structure
        );

        this.uploadOutput.emit(result);
      }
      this.fileElm.value = '';
      this.changeListen?.();
    });
  }
}
