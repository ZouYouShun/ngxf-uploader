import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploaderContainerComponent } from './uploader-container.component';
import { SignalFUploadComponent } from './signal-f-upload/signal-f-upload.component';
import { MultiFUploadComponent } from './multi-f-upload/multi-f-upload.component';
import { DropFUploadComponent } from './drop-f-upload/drop-f-upload.component';

const routes: Routes = [
  {
    path: '',
    component: UploaderContainerComponent,
    children: [
      {
        path: '',
        redirectTo: 'signal',
        pathMatch: 'full'
      },
      {
        path: 'signal',
        component: SignalFUploadComponent
      },
      {
        path: 'multi',
        component: MultiFUploadComponent
      },
      {
        path: 'drop',
        component: DropFUploadComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploaderContainerRoutingModule { }
