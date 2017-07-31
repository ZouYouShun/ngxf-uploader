import { NgModule } from '@angular/core';
import { AlertConfirmComponent } from './components/alert-confirm/alert-confirm.component';
import { MyMaterialModuleModule } from './my-material-module.module';

@NgModule({
  imports: [
    MyMaterialModuleModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class SharedModule { }
