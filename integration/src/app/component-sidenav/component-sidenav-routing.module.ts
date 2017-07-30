import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageContainerComponent } from './page-container/page-container.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'upload',
    pathMatch: 'full'
  },
  {
    path: 'upload',
    component: PageContainerComponent,
    children: [
      {
        path: '',
        redirectTo: 'single',
        pathMatch: 'full'
      },
      {
        path: 'single',
        loadChildren: './page-container/uploader-container/uploader-container.module#UploaderContainerModule',
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentSidenavRoutingModule { }
