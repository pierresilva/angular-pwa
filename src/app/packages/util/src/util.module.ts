import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
})
export class AppUtilModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppUtilModule,
    };
  }
}
