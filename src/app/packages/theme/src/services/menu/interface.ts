export interface Menu {
  [key: string]: any;
  /** Texto */
  text: string;
  /** I18n clave principal */
  i18n?: string;
  /** Se debe mostrar el nombre del grupo?, por defecto: `true` */
  group?: boolean;
  /** Enrutamiento */
  link?: string;
  /**
   * La ruta coincide exactamente?, por defecto: `false`
   * - [RouterLinkActive](https://angular.io/api/router/RouterLinkActive#routerLinkActiveOptions)
   */
  linkExact?: boolean;
  /** Enlace externo */
  externalLink?: string;
  /** Objetivo de enlace */
  target?: '_blank' | '_self' | '_parent' | '_top';
  /** Icono */
  icon?: string;
  /** Número de logotipos, números que se muestran. (Nota: `group: true` no es válido) */
  badge?: number;
  /** Número de logotipos, mostrando pequeños puntos rojos */
  badgeDot?: boolean;
  /** Color de badge (predeterminado: error */
  badgeStatus?: string;
  /** Ocultar el menú? */
  hide?: boolean;
  /**
   * Ocultar las migas de pan, que son válidas cuando el componente `page-header`
   * genera automáticamente migas de pan
   */
  hideInBreadcrumb?: boolean;
  /**
   * La configuración de ACL, si es automáticamente válida al importar `@app/acl`,
   * es equivalente al valor del parámetro `ACLService.can(roleOrAbility: ACLCanType)`
   */
  acl?: any;
  /** Elemento de menú en accesos directos? */
  shortcut?: boolean;
  /** Nodo raíz del menú contextual */
  shortcutRoot?: boolean;
  /** Permitir la reutilización?, es necesario cooperar con el componente `reuse-tab` */
  reuse?: boolean;
  /** Menú secundario */
  children?: Menu[];
}
