import { NgModule, ModuleWithProviders } from '@angular/core';
import { AlertConfirmComponent } from './components/alert-confirm/alert-confirm.component';
import { MyMaterialModuleModule } from './my-material-module.module';
import { UploaderService } from './services/uploader.service';

@NgModule({
  imports: [
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class SharedModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [UploaderService]
    };
  }
}
