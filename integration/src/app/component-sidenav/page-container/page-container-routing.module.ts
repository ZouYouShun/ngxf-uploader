import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploaderContainerComponent } from './uploader-container/uploader-container.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageContainerRoutingModule { }
