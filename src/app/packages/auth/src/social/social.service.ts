import { Injectable, Inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { Observer, Observable } from 'rxjs';

import {
  ITokenModel,
  ITokenService,
  DA_SERVICE_TOKEN,
} from '../token/interface';

const OPENTYPE = '_delonAuthSocialType';
const HREFCALLBACK = '_delonAuthSocialCallbackByHref';

export type SocialOpenType = 'href' | 'window';

@Injectable()
export class SocialService implements OnDestroy {
  private _win: Window;
  private _win$: any;
  private observer: Observer<ITokenModel>;

  constructor(
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    @Inject(DOCUMENT) private doc: any,
    private router: Router,
  ) { }

  /**
   * Utilice el formulario para abrir la página de login, el valor de retorno es:
   * `Observable <ITokenModel>`
   * y el resultado se devuelve después de suscribirse a la autorización
   * @param url Obtener una URL de autorización
   * @param callback URL de enrutamiento para el callback
   * @param options.windowFeatures Equivalente `window.open` de `features` valor del parámetro
   */
  login(
    url: string,
    callback?: string,
    options?: {
      type?: 'window';
      windowFeatures?: string;
    },
  ): Observable<ITokenModel>;

  /**
   * Salte a la página de login
   * @param url URL de login
   * @param callback URL del callback
   */
  login(
    url: string,
    callback?: string,
    options?: {
      type?: 'href';
    },
  ): void;

  /**
   * Salta a la página de login, si `type=window` cuando el valor de retorno es `Observable<ITokenModel>`
   * @param url URL de login
   * @param callback URL cuando `type = href` tiene éxito
   * @param options.type Modo abierto, `window` predeterminada
   * @param options.windowFeatures Equivalente al valor del parámetro `features` de` window.open`
   */
  login(
    url: string,
    callback: string = '/',
    options: {
      type?: SocialOpenType;
      windowFeatures?: string;
    } = {},
  ): Observable<ITokenModel> | void {
    options = Object.assign(
      {
        type: 'window',
        windowFeatures:
          'location=yes,height=570,width=520,scrollbars=yes,status=yes',
      },
      options,
    );
    localStorage.setItem(OPENTYPE, options.type);
    localStorage.setItem(HREFCALLBACK, callback);
    if (options.type === 'href') {
      this.doc.location.href = url;
      return;
    }

    this._win = window.open(url, '_blank', options.windowFeatures);
    this._win$ = setInterval(() => {
      if (this._win && this._win.closed) {
        this.ngOnDestroy();

        let model = this.tokenService.get();
        if (model && !model.token) {
          model = null;
        }

        // Notificación de cambio de activación
        if (model) {
          this.tokenService.set(model);
        }

        this.observer.next(model);
        this.observer.complete();
      }
    }, 100);
    return Observable.create((observer: Observer<ITokenModel>) => {
      this.observer = observer;
    });
  }

  /**
   * Procesamiento dal callback después de un login exitoso
   *
   * @param rawData Especifica la información de autenticación del callback. Cuando está vacía, se analiza desde la URL actual.
   */
  callback(rawData?: string | ITokenModel): ITokenModel {
    // from uri
    if (!rawData && this.router.url.indexOf('?') === -1) {
      throw new Error(`url muse contain a ?`);
    }
    // parse
    let data: ITokenModel = { token: `` };
    if (typeof rawData === 'string') {
      const rightUrl = rawData.split('?')[1].split('#')[0];
      data = <any>this.router.parseUrl('./?' + rightUrl).queryParams;
    } else {
      data = rawData;
    }

    if (!data || !data.token) {
      throw new Error(`invalide token data`);
    }
    this.tokenService.set(data);

    const url = localStorage.getItem(HREFCALLBACK) || '/';
    localStorage.removeItem(HREFCALLBACK);
    const type = localStorage.getItem(OPENTYPE);
    localStorage.removeItem(OPENTYPE);
    if (type === 'window') {
      window.close();
    } else {
      this.router.navigateByUrl(url);
    }

    return data;
  }

  ngOnDestroy(): void {
    clearInterval(this._win$);
    this._win$ = null;
  }
}
