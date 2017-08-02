import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploaderContainerRoutingModule } from './uploader-container-routing.module';
import { UploaderContainerComponent } from './uploader-container.component';
import { MyMaterialModuleModule } from '@shared/my-material-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignalFUploadComponent } from './signal-f-upload/signal-f-upload.component';
import { MultiFUploadComponent } from './multi-f-upload/multi-f-upload.component';
import { NgxfUploaderModule } from 'ngxf-uploader';
import { DropFUploadComponent } from './drop-f-upload/drop-f-upload.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UploaderContainerRoutingModule,
    MyMaterialModuleModule,
    NgxfUploaderModule,
    SharedModule,
  ],
  declarations: [
    UploaderContainerComponent,
    SignalFUploadComponent,
    MultiFUploadComponent,
    DropFUploadComponent
]
})
export class UploaderContainerModule { }
