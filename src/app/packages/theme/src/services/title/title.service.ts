import {
  Injectable,
  Inject,
  Optional,
  Injector,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';

import { MenuService } from '../menu/menu.service';
import { APP_I18N_TOKEN, AppI18NService } from '../i18n/i18n';

/**
 * Establecer título
 */
@Injectable({ providedIn: 'root' })
export class TitleService implements OnDestroy {
  private _prefix = '';
  private _suffix = '';
  private _separator = ' - ';
  private _reverse = false;
  private _default = 'Not Page Name';
  private i18n$: Subscription;

  constructor(
    private injector: Injector,
    private title: Title,
    private menuSrv: MenuService,
    @Optional()
    @Inject(APP_I18N_TOKEN)
    private i18nSrv: AppI18NService,
    @Inject(DOCUMENT) private doc: any,
  ) {
    if (this.i18nSrv) {
      this.i18n$ = this.i18nSrv.change.subscribe(() => this.setTitle());
    }
  }

  /** Establecer separador */
  set separator(value: string) {
    this._separator = value;
  }

  /** Establecer prefijo */
  set prefix(value: string) {
    this._prefix = value;
  }

  /** Establecer el sufijo */
  set suffix(value: string) {
    this._suffix = value;
  }

  /** Establecer si invertir */
  set reverse(value: boolean) {
    this._reverse = value;
  }

  /** Establecer título predeterminado */
  set default(value: string) {
    this._default = value;
  }

  private getByElement(): string {
    const el =
      this.doc.querySelector('h1 .page__title') ||
      this.doc.querySelector('h2 .page__title') ||
      this.doc.querySelector('.page-header__title');
    if (el) {
      return el.firstChild.textContent.trim();
    }
    return '';
  }

  private getByRoute(): string {
    let next = this.injector.get(ActivatedRoute);
    while (next.firstChild) {
      next = next.firstChild;
    }
    const data = (next.snapshot && next.snapshot.data) || {};
    if (data.titleI18n && this.i18nSrv) {
      data.title = this.i18nSrv.fanyi(data.titleI18n);
    }
    return data.title;
  }

  private getByMenu(): string {
    const menus = this.menuSrv.getPathByUrl(this.injector.get(Router).url);
    if (!menus || menus.length <= 0) {
      return '';
    }

    const item = menus[menus.length - 1];
    let title;
    if (item.i18n && this.i18nSrv) {
      title = this.i18nSrv.fanyi(item.i18n);
    }
    return title || item.text;
  }

  /**
   * Establecer título
   */
  setTitle(title?: string | string[]) {
    if (!title) {
      title =
        this.getByRoute() ||
        this.getByMenu() ||
        this.getByElement() ||
        this._default;
    }
    if (title && !Array.isArray(title)) {
      title = [title];
    }

    let newTitles = [];
    if (this._prefix) {
      newTitles.push(this._prefix);
    }
    newTitles.push(...(title as string[]));
    if (this._suffix) {
      newTitles.push(this._suffix);
    }
    if (this._reverse) {
      newTitles = newTitles.reverse();
    }
    this.title.setTitle(newTitles.join(this._separator));
  }

  ngOnDestroy(): void {
    if (this.i18n$) {
      this.i18n$.unsubscribe();
    }
  }
}
