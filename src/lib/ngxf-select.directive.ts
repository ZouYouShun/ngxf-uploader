import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  inject,
  input,
  OnDestroy,
  output,
  Renderer2,
} from '@angular/core';

import {
  FileError,
  FileValidateOptions,
  NgxfDirectoryStructure,
  NgxfUploadDirective,
  NgxfUploadFolder,
} from './ngxf-uploader.model';
import { getUploadResult } from './utils';

/**
 * provide a directive that can let you select file upload by click
 */
@Directive({
  selector: '[ngxf-select]',
  standalone: true,
})
export class NgxfSelectDirective
  implements AfterViewInit, OnDestroy, NgxfUploadDirective
{
  private _render = inject(Renderer2);
  private _elm = inject(ElementRef);
  /** when use select some files end, that will trigger */
  uploadOutput = output<File | File[] | NgxfDirectoryStructure[] | FileError>({
    alias: 'ngxf-select',
  });
  fileOption = input<FileValidateOptions>({}, { alias: 'ngxf-validate' });
  multiple = input<boolean | undefined>();
  accept = input<string | undefined>();
  /** is that is select folder mode, only work when `multiple` also be `true` */
  folder = input<boolean | undefined>();
  structure = input<NgxfUploadFolder>();

  private fileElm!: HTMLInputElement;

  changeListen!: () => void;

  @HostListener('click') click() {
    this.bindBeforeClick();

    this.fileElm.click();
  }

  ngAfterViewInit(): void {
    this.fileElm = this._render.createElement('input');
    this._render.setAttribute(this.fileElm, 'type', 'file');
    this._render.setStyle(this.fileElm, 'display', 'none');

    if (this.folder() !== undefined && this.multiple() !== undefined) {
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
    if (this.multiple() !== undefined) {
      this._render.setAttribute(this.fileElm, 'multiple', '');
    } else {
      this._render.removeAttribute(this.fileElm, 'multiple');
    }

    this._render.setAttribute(this.fileElm, 'accept', this.accept() || '');

    this.changeListen?.();

    this.changeListen = this._render.listen(this.fileElm, 'change', (e) => {
      const files = this.fileElm?.files;
      // when length is more than 0
      if (files?.length) {
        const result = getUploadResult(
          files,
          this.accept() || '',
          this.multiple(),
          this.fileOption(),
          this.structure(),
        );

        this.uploadOutput.emit(result);
      }
      this.fileElm.value = '';
      this.changeListen?.();
    });
  }
}
