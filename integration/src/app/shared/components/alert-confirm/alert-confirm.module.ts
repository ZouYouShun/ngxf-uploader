import { MyMaterialModuleModule } from '../../my-material-module.module';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertConfirmService } from './alert-confirm.service';
import { AlertConfirmComponent } from './alert-confirm.component';

@NgModule({
  imports: [
    CommonModule,
    MyMaterialModuleModule
  ],
  declarations: [
    AlertConfirmComponent
  ],
  entryComponents: [AlertConfirmComponent]
})
export class AlertConfirmModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: AlertConfirmModule,
      providers: [AlertConfirmService]
    };
  }
}
