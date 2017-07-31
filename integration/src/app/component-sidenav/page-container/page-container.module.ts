import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageContainerRoutingModule } from './page-container-routing.module';
import { PageContainerComponent } from './page-container.component';
import { MyMaterialModuleModule } from '../../shared/my-material-module.module';
import { UploaderContainerModule } from './uploader-container/uploader-container.module';

@NgModule({
  imports: [
    CommonModule,
    MyMaterialModuleModule,
    PageContainerRoutingModule,
    UploaderContainerModule
  ],
  declarations: [
    PageContainerComponent
  ]
})
export class PageContainerModule { }
