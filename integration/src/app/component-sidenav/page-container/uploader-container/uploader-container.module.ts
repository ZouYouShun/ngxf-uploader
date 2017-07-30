import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploaderContainerRoutingModule } from './uploader-container-routing.module';
import { UploaderContainerComponent } from './uploader-container.component';
import { UploaderComponent } from './uploader/uploader.component';
import { MyMaterialModuleModule } from '../../../shared/my-material-module.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UploaderContainerRoutingModule,
    MyMaterialModuleModule
  ],
  declarations: [
    UploaderContainerComponent,
    UploaderComponent
  ]
})
export class UploaderContainerModule { }
