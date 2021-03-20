import { NgModule } from '@angular/core';

import { NgxfDropDirective } from './directive/ngxf-drop.directive';
import { NgxfParseDirective } from './directive/ngxf-parse.directive';
import { NgxfSelectDirective } from './directive/ngxf-select.directive';

@NgModule({
  declarations: [
    NgxfSelectDirective,
    NgxfDropDirective,
    NgxfParseDirective
  ],
  exports: [
    NgxfSelectDirective,
    NgxfDropDirective,
    NgxfParseDirective
  ]
})
export class NgxfUploaderModule {
}
