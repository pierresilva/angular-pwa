import { Injectable, Inject, Provider, Optional, SkipSelf } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { LocaleData } from './locale.types';
import { APP_LOCALE } from './locale.tokens';
import esES from './languages/es-ES';

@Injectable()
export class AppLocaleService {
  private _locale: LocaleData;
  private change$ = new BehaviorSubject<LocaleData>(this._locale);

  constructor(@Inject(APP_LOCALE) locale: LocaleData) {
    this.setLocale(locale || esES);
  }

  get change(): Observable<LocaleData> {
    return this.change$.asObservable();
  }

  setLocale(locale: LocaleData): void {
    if (this._locale && this._locale.abbr === locale.abbr) {
      return;
    }
    this._locale = locale;
    this.change$.next(locale);
  }

  get locale(): LocaleData {
    return this._locale;
  }

  getData(path: string) {
    return this._locale[path] || {};
  }
}

export function APP_LOCALE_SERVICE_PROVIDER_FACTORY(exist: AppLocaleService, locale: LocaleData): AppLocaleService {
  return exist || new AppLocaleService(locale);
}

export const APP_LOCALE_SERVICE_PROVIDER: Provider = {
  provide: AppLocaleService,
  useFactory: APP_LOCALE_SERVICE_PROVIDER_FACTORY,
  deps: [[new Optional(), new SkipSelf(), AppLocaleService], APP_LOCALE]
};
