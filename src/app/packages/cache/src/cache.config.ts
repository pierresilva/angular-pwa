export class AppCacheConfig {
  /**
   * Modo de caché, por defecto：`promise`
   * - `promise` Modo personalizado, permitido `key` como http obtiene datos
   * - `none` Modo normal
   */
  mode?: 'promise' | 'none' = 'promise';
  /**
   * Cambia el nombre de los parámetros de retorno, por ejemplo:
   * - `null` retorno
   * - `list` retorno `{ list: [] }`
   * - `result.list` retorno `{ result: { list: [] } }`
   */
  reName?: string | string[] = '';
  /**
   * Prefijo de clave de datos persistentes
   */
  // tslint:disable-next-line:no-inferrable-types
  prefix?: string = '';
  /**
   * Nombre de clave de almacenamiento de metadatos de datos persistentes
   */
  // tslint:disable-next-line:no-inferrable-types
  meta_key?: string = '__cache_meta';
}
