import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { LayoutDefaultComponent } from './layout-default/layout-default.component';
import { LayoutFullscreenComponent } from './layout-fullscreen/layout-fullscreen.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [
    LayoutDefaultComponent,
    LayoutFullscreenComponent,
  ],
  exports: [
    LayoutDefaultComponent,
    LayoutFullscreenComponent,
  ],
  entryComponents: [
    LayoutDefaultComponent,
    LayoutFullscreenComponent,
  ]
})
export class LayoutsModule { }
