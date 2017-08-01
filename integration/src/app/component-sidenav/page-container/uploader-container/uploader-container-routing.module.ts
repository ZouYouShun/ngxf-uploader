import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploaderContainerComponent } from './uploader-container.component';
import { SignalFUploadComponent } from './signal-f-upload/signal-f-upload.component';
import { MultiFUploadComponent } from './multi-f-upload/multi-f-upload.component';

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
        component: SignalFUploadComponent,
        resolve: {
          menuList: 'signal'
        },
      },
      {
        path: 'multi',
        component: MultiFUploadComponent,
        resolve: {
          menuList: 'multi'
        },
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [
    {
      provide: 'signal',
      useValue: () => {
        return 'aaaaa';
      }
    }, {
      provide: 'multi',
      useValue: () => {
        return 'bbb';
      }
    }
  ],
  exports: [RouterModule]
})
export class UploaderContainerRoutingModule { }
