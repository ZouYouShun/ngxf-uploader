import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MdButtonModule,
  MdCardModule,
  MdToolbarModule,
  MdIconModule,
  MdSidenavModule,
  MdSliderModule,
  MdDialogModule,
  MdProgressBarModule,
  MdProgressSpinnerModule
} from '@angular/material';

@NgModule({
  imports: [
    MdButtonModule,
    MdCardModule,
    MdToolbarModule,
    MdIconModule,
    MdSidenavModule,
    MdSliderModule,
    MdDialogModule,
    MdProgressBarModule,
    MdProgressSpinnerModule
  ],
  exports: [
    MdButtonModule,
    MdCardModule,
    MdToolbarModule,
    MdIconModule,
    MdSidenavModule,
    MdSliderModule,
    MdDialogModule,
    MdProgressBarModule,
    MdProgressSpinnerModule
  ],
})
export class MyMaterialModuleModule { }
