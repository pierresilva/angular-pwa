import { InjectionToken, Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

export interface AppI18NService {
  [key: string]: any;

  use(lang: string): void;

  getLangs(): any[];

  fanyi(key: string): any;

  // tslint:disable-next-line:member-ordering
  readonly change: Observable<string>;
}

export const APP_I18N_TOKEN = new InjectionToken<AppI18NService>(
  'appTranslatorToken',
);

@Injectable({ providedIn: 'root' })
export class AppI18NServiceFake implements AppI18NService {
  private change$ = new BehaviorSubject<string>(null);

  get change(): Observable<string> {
    return this.change$.asObservable().pipe(filter(w => w != null));
  }

  use(lang: string): void {
    this.change$.next(lang);
  }

  getLangs(): any[] {
    return [];
  }

  fanyi(key: string) {
    return key;
  }
}
