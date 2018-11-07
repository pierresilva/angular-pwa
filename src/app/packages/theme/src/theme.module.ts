import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { WINDOW } from './win_tokens';

import { AppLocaleModule } from './locale/locale.module';

// region: import
import { APP_I18N_TOKEN, AppI18NServiceFake } from './services/i18n/i18n';

// import { ModalHelper } from './services/modal/modal.helper';
const HELPERS = [];

// components
const COMPONENTS = [];

// pipes
import { DatePipe } from './pipes/date/date.pipe';
import { CNCurrencyPipe } from './pipes/currency/cn-currency.pipe';
import { KeysPipe } from './pipes/keys/keys.pipe';
import { YNPipe } from './pipes/yn/yn.pipe';
const PIPES = [DatePipe, CNCurrencyPipe, KeysPipe, YNPipe];

// endregion

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [...COMPONENTS, ...PIPES],
  exports: [...COMPONENTS, ...PIPES, AppLocaleModule],
})
export class AppThemeModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppThemeModule,
      providers: [
        { provide: WINDOW, useValue: window },
        { provide: APP_I18N_TOKEN, useClass: AppI18NServiceFake },
        ...HELPERS,
      ],
    };
  }

  static forChild(): ModuleWithProviders {
    return {
      ngModule: AppThemeModule,
      providers: [...HELPERS],
    };
  }
}
