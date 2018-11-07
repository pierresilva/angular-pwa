import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoutesRoutingModule } from './routes-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RoutesRoutingModule,
    SharedModule,
  ],
  declarations: []
})
export class RoutesModule { }
