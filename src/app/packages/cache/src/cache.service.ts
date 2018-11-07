import { Injectable, OnDestroy, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as addSeconds from 'date-fns/add_seconds';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import {
  DC_STORE_STORAGE_TOKEN,
  ICacheStore,
  ICache,
  CacheNotifyResult,
  CacheNotifyType,
} from './interface';
import { AppCacheConfig } from './cache.config';

@Injectable()
export class CacheService implements OnDestroy {
  private readonly memory: Map<string, ICache> = new Map<string, ICache>();
  private readonly notifyBuffer: Map<
    string,
    BehaviorSubject<CacheNotifyResult>
  > = new Map<string, BehaviorSubject<CacheNotifyResult>>();
  private meta: Set<string> = new Set<string>();
  private freq_tick = 3000;
  private freq_time: any;

  constructor(
    private options: AppCacheConfig,
    @Inject(DC_STORE_STORAGE_TOKEN) private store: ICacheStore,
    private http: HttpClient,
  ) {
    this.loadMeta();
    this.startExpireNotify();
  }

  _deepGet(obj: any, path: string[], defaultValue?: any) {
    if (!obj) {
      return defaultValue;
    }
    if (path.length <= 1) {
      const checkObj = path.length ? obj[path[0]] : obj;
      return typeof checkObj === 'undefined' ? defaultValue : checkObj;
    }
    return path.reduce((o, k) => o[k], obj) || defaultValue;
  }

  // region: meta

  private pushMeta(key: string) {
    if (this.meta.has(key)) {
      return;
    }
    this.meta.add(key);
    this.saveMeta();
  }

  private removeMeta(key: string) {
    if (!this.meta.has(key)) {
      return;
    }
    this.meta.delete(key);
    this.saveMeta();
  }

  private loadMeta() {
    const ret = this.store.get(this.options.meta_key);
    if (ret && ret.v) {
      (ret.v as string[]).forEach(key => this.meta.add(key));
    }
  }

  private saveMeta() {
    const metaData: string[] = [];
    this.meta.forEach(key => metaData.push(key));
    this.store.set(this.options.meta_key, { v: metaData, e: 0 });
  }

  getMeta() {
    return this.meta;
  }

  // endregion

  // region: set

  /**
   * Caché persistente `Observable` objeto, por ejemplo：
   * - `set('data/1', this.http.get('data/1')).subscribe()`
   * - `set('data/1', this.http.get('data/1'), { expire: 10 }).subscribe()`
   */
  set<T>(
    key: string,
    data: Observable<T>,
    options?: { type?: 's'; expire?: number },
  ): Observable<T>;
  /**
   * Caché persistente `Observable` objeto, por ejemplo：
   * - `set('data/1', this.http.get('data/1')).subscribe()`
   * - `set('data/1', this.http.get('data/1'), { expire: 10 }).subscribe()`
   */
  set(
    key: string,
    data: Observable<any>,
    options?: { type?: 's'; expire?: number },
  ): Observable<any>;
  /**
   * Almacenamiento en memoria caché persistente de objetos base, como：
   * - `set('data/1', 1)`
   * - `set('data/1', 1, { expire: 10 })`
   */
  set(
    key: string,
    data: Object,
    options?: { type?: 's'; expire?: number },
  ): void;
  /**
   * Especifique un tipo de caché para el almacenamiento en memoria caché de objetos,
   * como el almacenamiento en memoria caché：
   * - `set('data/1', 1, { type: 'm' })`
   * - `set('data/1', 1, { type: 'm', expire: 10 })`
   */
  set(
    key: string,
    data: Object,
    options: { type: 'm' | 's'; expire?: number },
  ): void;
  /**
   * Objeto de caché
   */
  set(
    key: string,
    data: any | Observable<any>,
    options: {
      /**Tipo de almacenamiento, 'm' para memoria y 's' para persistencia */
      type?: 'm' | 's';
      /**
       * Tiempo de caducidad, unidad `segundos`
       */
      expire?: number;
    } = {},
  ): any {
    // expire
    let e = 0;
    if (options.expire) {
      e = addSeconds(new Date(), options.expire).valueOf();
    }
    if (!(data instanceof Observable)) {
      this.save(options.type, key, { v: data, e });
      return;
    }
    return data.pipe(
      tap((v: any) => {
        this.save(options.type, key, { v, e });
      }),
    );
  }

  private save(type: 'm' | 's', key: string, value: ICache) {
    if (type === 'm') {
      this.memory.set(key, value);
    } else {
      this.store.set(this.options.prefix + key, value);
      this.pushMeta(key);
    }
    this.runNotify(key, 'set');
  }

  // endregion

  // region: get

  /** Obtener datos en caché, si `key` no existe, `key` se devuelve como un caché de solicitudes HTTP */
  get<T>(
    key: string,
    options?: {
      mode: 'promise';
      type?: 'm' | 's';
      expire?: number;
    },
  ): Observable<T>;
  /** Obtener datos en caché, si `key` no existe, `key` se devuelve como un caché de solicitudes HTTP */
  get(
    key: string,
    options?: {
      mode: 'promise';
      type?: 'm' | 's';
      expire?: number;
    },
  ): Observable<any>;
  /** Obtener datos en caché, o null si `key` no existe o ha expirado */
  get(
    key: string,
    options: {
      mode: 'none';
      type?: 'm' | 's';
      expire?: number;
    },
  ): any;
  get(
    key: string,
    options: {
      mode?: 'promise' | 'none';
      type?: 'm' | 's';
      expire?: number;
    } = {},
  ): Observable<any> | any {
    const isPromise =
      options.mode !== 'none' && this.options.mode === 'promise';
    const value: ICache = this.memory.has(key)
      ? this.memory.get(key)
      : this.store.get(this.options.prefix + key);
    if (!value || (value.e && value.e > 0 && value.e < new Date().valueOf())) {
      if (isPromise) {
        return this.http
          .get(key)
          .pipe(
            map((ret: any) =>
              this._deepGet(ret, this.options.reName as string[], null),
            ),
            tap(v => this.set(key, v)),
          );
      }
      return null;
    }

    return isPromise ? of(value.v) : value.v;
  }

  /** Obtenga datos en caché, o null si `key` no existe o ha expirado */
  getNone<T>(key: string): T;
  /** Obtenga datos en caché, o null si `key` no existe o ha expirado */
  getNone(key: string): any {
    return this.get(key, { mode: 'none' });
  }

  /**
   * Obtener la memoria caché, establecer el objeto `Observable` de la memoria caché persistente si no existe
   */
  tryGet<T>(
    key: string,
    data: Observable<T>,
    options?: { type?: 's'; expire?: number },
  ): Observable<T>;
  /**
   * Obtener la memoria caché, establecer el objeto `Observable` de la memoria caché persistente si no existe
   */
  tryGet(
    key: string,
    data: Observable<any>,
    options?: { type?: 's'; expire?: number },
  ): Observable<any>;
  /**
   * Obtener el caché, establecer el objeto base de caché persistente si no existe
   */
  tryGet(
    key: string,
    data: Object,
    options?: { type?: 's'; expire?: number },
  ): any;
  /**
   * Obtener el caché, si no existe, configure el tipo de caché especificado para almacenar el objeto en caché
   */
  tryGet(
    key: string,
    data: Object,
    options: { type: 'm' | 's'; expire?: number },
  ): any;

  /**
   * Obtener el caché, establecer el objeto de caché si no existe
   */
  tryGet(
    key: string,
    data: any | Observable<any>,
    options: {
      /** Tipo de almacenamiento, 'm' para memoria y 's' para persistencia */
      type?: 'm' | 's';
      /**
       * Tiempo de caducidad, unidad `segundos`
       */
      expire?: number;
    } = {},
  ): any {
    const ret = this.getNone(key);
    if (ret === null) {
      if (!(data instanceof Observable)) {
        this.set(key, data, <any>options);
        return data;
      }

      return this.set(key, data as Observable<any>, <any>options);
    }
    return of(ret);
  }

  // endregion

  // region: has

  /** Si guardar en caché `clave` */
  has(key: string): boolean {
    return this.memory.has(key) || this.meta.has(key);
  }

  // endregion

  // region: remove

  private _remove(key: string, needNotify: boolean) {
    if (needNotify) {
      this.runNotify(key, 'remove');
    }
    if (this.memory.has(key)) {
      this.memory.delete(key);
      return;
    }
    this.store.remove(this.options.prefix + key);
    this.removeMeta(key);
  }

  /** Eliminar caché */
  remove(key: string) {
    this._remove(key, true);
  }

  /** Eliminar todos los cachés */
  clear() {
    this.notifyBuffer.forEach((v, k) => this.runNotify(k, 'remove'));
    this.memory.clear();
    this.meta.forEach(key => this.store.remove(this.options.prefix + key));
  }

  // endregion

  // region: notify

  /**
   * Configure la frecuencia de escucha en milisegundos y el mínimo `20ms`, predeterminado:` 3000ms`
   */
  set freq(value: number) {
    this.freq_tick = Math.max(20, value);
    this.abortExpireNotify();
    this.startExpireNotify();
  }

  private startExpireNotify() {
    this.checkExpireNotify();
    this.runExpireNotify();
  }

  private runExpireNotify() {
    this.freq_time = setTimeout(() => {
      this.checkExpireNotify();
      this.runExpireNotify();
    }, this.freq_tick);
  }

  private checkExpireNotify() {
    const removed: string[] = [];
    this.notifyBuffer.forEach((v, key) => {
      if (this.has(key) && this.getNone(key) === null) {
        removed.push(key);
      }
    });
    removed.forEach(key => {
      this.runNotify(key, 'expire');
      this._remove(key, false);
    });
  }

  private abortExpireNotify() {
    clearTimeout(this.freq_time);
  }

  private runNotify(key: string, type: CacheNotifyType) {
    if (!this.notifyBuffer.has(key)) {
      return;
    }
    this.notifyBuffer.get(key).next({ type, value: this.getNone(key) });
  }

  /**
   * `key` escucha, cuando` key` cambia, caduca y elimina las notificaciones, tenga en cuenta los siguientes detalles:
   *
   * - Después de llamar, excepto que se vuela a llamar a `cancelNotify`, nunca caducará.
   * - El oyente realiza una comprobación de caducidad cada `freq` (valor predeterminado: 3 segundos)
   */
  notify(key: string): Observable<CacheNotifyResult> {
    if (!this.notifyBuffer.has(key)) {
      const change$ = new BehaviorSubject<CacheNotifyResult>(this.getNone(key));
      this.notifyBuffer.set(key, change$);
    }
    return this.notifyBuffer.get(key).asObservable();
  }

  /**
   * Cancelar el oyente de `key`
   */
  cancelNotify(key: string): void {
    if (!this.notifyBuffer.has(key)) {
      return;
    }
    this.notifyBuffer.get(key).unsubscribe();
    this.notifyBuffer.delete(key);
  }

  /** `key` si ha sido monitoreado */
  hasNotify(key: string): boolean {
    return this.notifyBuffer.has(key);
  }

  /** Borrar a todos los oyentes por `clave` */
  clearNotify(): void {
    this.notifyBuffer.forEach(v => v.unsubscribe());
    this.notifyBuffer.clear();
  }

  // endregion

  ngOnDestroy(): void {
    this.memory.clear();
    this.abortExpireNotify();
    this.clearNotify();
  }
}
