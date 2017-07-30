import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComponentSidenavComponent } from './component-sidenav/component-sidenav.component';
import { PageContainerComponent } from './component-sidenav/page-container/page-container.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'page',
    pathMatch: 'full'
  },
  {
    path: 'page',
    component: ComponentSidenavComponent,
    children: [
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
            loadChildren: './component-sidenav/page-container/uploader-container/uploader-container.module#UploaderContainerModule',
          }
        ]
      },
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
