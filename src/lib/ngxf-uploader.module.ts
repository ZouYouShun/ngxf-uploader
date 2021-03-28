import { NgModule } from '@angular/core';

import { NgxfDropDirective } from './ngxf-drop.directive';
import { NgxfParseDirective } from './ngxf-parse.directive';
import { NgxfSelectDirective } from './ngxf-select.directive';

/**
 * ### ngxf-upload
 *
 * A file upload module provide you can upload file easily
 */
@NgModule({
  declarations: [NgxfSelectDirective, NgxfDropDirective, NgxfParseDirective],
  exports: [NgxfSelectDirective, NgxfDropDirective, NgxfParseDirective],
})
export class NgxfUploaderModule {}
