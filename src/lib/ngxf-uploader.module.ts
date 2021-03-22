import { NgModule } from '@angular/core';

import { NgxfDropDirective } from './directive/ngxf-drop.directive';
import { NgxfParseDirective } from './directive/ngxf-parse.directive';
import { NgxfSelectDirective } from './directive/ngxf-select.directive';

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
