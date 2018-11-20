import { NgModule } from '@angular/core';

import { NgxfDropDirective } from './directive/ngxf-drop.directive';
import { NgxfSelectDirective } from './directive/ngxf-select.directive';

@NgModule({
  declarations: [
    NgxfSelectDirective,
    NgxfDropDirective
  ],
  exports: [
    NgxfSelectDirective,
    NgxfDropDirective
  ]
})
export class NgxfUploaderModule {
}
