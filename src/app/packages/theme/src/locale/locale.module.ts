import { NgModule } from '@angular/core';

import esES from './languages/es-ES';

import { APP_LOCALE } from './locale.tokens';
import { APP_LOCALE_SERVICE_PROVIDER } from './locale.service';

@NgModule({
  providers: [
    { provide: APP_LOCALE, useValue: esES },
    APP_LOCALE_SERVICE_PROVIDER,
  ],
})
export class AppLocaleModule {}
