import { NgModule, ModuleWithProviders } from '@angular/core';

import { NgxfSelectDirective } from './directive/ngxf-select.directive';
import { NgxfDropDirective } from './directive/ngxf-drop.directive';

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
