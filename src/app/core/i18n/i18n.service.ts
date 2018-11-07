import { Injectable, Inject, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

import * as df_en from 'date-fns/locale/en';
import * as df_es from 'date-fns/locale/es';
import { TranslateService } from '@ngx-translate/core';
import { SettingsService, AppI18NService } from '../../packages/theme';

@Injectable()
export class I18NService implements AppI18NService {
  private _default = 'es-ES';
  private change$ = new BehaviorSubject<string>(null);

  private _langs = [
    { code: 'es-ES', text: 'Español' },
    { code: 'en-US', text: 'English' },
  ];

  constructor(
    settings: SettingsService,
    private translate: TranslateService,
    private injector: Injector,
  ) {
    const defaultLan = settings.layout.lang || translate.getBrowserLang();
    const lans = this._langs.map(item => item.code);
    this._default = lans.includes(defaultLan) ? defaultLan : lans[0];
    translate.addLangs(lans);
  }

  setDateFns(lang: string): this {
    (window as any).__locale__ = lang === 'es-ES' ? df_es : df_en;
    return this;
  }

  get change(): Observable<string> {
    return this.change$.asObservable().pipe(filter(w => w != null));
  }

  use(lang: string): void {
    lang = lang || this.translate.getDefaultLang();
    if (this.currentLang === lang) {
      return;
    }
    this.translate.use(lang).subscribe(() => this.change$.next(lang));
  }
  /** Obtener lista de idiomas */
  getLangs() {
    return this._langs;
  }
  /** Traducción */
  fanyi(key: string) {
    return this.translate.instant(key);
  }
  /** Idioma por defecto */
  get defaultLang() {
    return this._default;
  }
  /** Idioma actual */
  get currentLang() {
    return (
      this.translate.currentLang ||
      this.translate.getDefaultLang() ||
      this._default
    );
  }
}
