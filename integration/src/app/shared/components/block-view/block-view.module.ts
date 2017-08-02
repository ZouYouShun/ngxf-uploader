import { BlockViewService } from './block-view.service';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockViewComponent } from './block-view.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    BlockViewComponent
  ],
  exports: [
    BlockViewComponent
  ]
})
export class BlockViewModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: BlockViewModule,
      providers: [BlockViewService]
    };
  }
}
