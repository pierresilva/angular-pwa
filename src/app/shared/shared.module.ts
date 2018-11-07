import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
// delon
import { AppThemeModule } from '../packages/theme';
import { AppACLModule } from '../packages/acl';
// i18n
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from './material/material.module';


// region: third libs
const THIRDMODULES = [
  FlexLayoutModule,
];
// endregion

// region: your componets & directives
const COMPONENTS = [];
const DIRECTIVES = [];
// endregion

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    AppThemeModule.forChild(),
    AppACLModule,
    MaterialModule,
    // third libs
    ...THIRDMODULES,
  ],
  declarations: [
    // your components
    ...COMPONENTS,
    ...DIRECTIVES,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AppThemeModule,
    AppACLModule,
    MaterialModule,
    // i18n
    TranslateModule,
    // third libs
    ...THIRDMODULES,
    // your components
    ...COMPONENTS,
    ...DIRECTIVES,
  ],
})
export class SharedModule {}
