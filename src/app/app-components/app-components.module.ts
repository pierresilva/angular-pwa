import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MessageSnackbarComponent } from './message-snackbar/message-snackbar.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [
    MessageSnackbarComponent,
  ],
  exports: [
    MessageSnackbarComponent
  ],
  entryComponents: [
    MessageSnackbarComponent,
  ]
})
export class AppComponentsModule { }
