import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploaderComponent } from './uploader/uploader.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'signal',
    pathMatch: 'full'
  },
  {
    path: 'signal',
    component: UploaderComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploaderContainerRoutingModule { }
