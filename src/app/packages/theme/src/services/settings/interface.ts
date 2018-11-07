export interface App {
  name?: string;
  description?: string;
  year?: number;
  [key: string]: any;
}

export interface User {
  name?: string;
  avatar?: string;
  email?: string;
  [key: string]: any;
}

export interface Layout {
  /** Para arreglar el menú superior */
  fixed: boolean;
  /** Doblar el menú lateral */
  collapsed: boolean;
  /** Para arreglar el ancho */
  boxed: boolean;
  /** Idioma */
  lang: string;
  /** Tema actual */
  theme: string;
  [key: string]: any;
}

export interface SettingsNotify {
  type: 'layout' | 'app' | 'user';
  /** Actualizar `key`, límite `layout` es válido */
  name?: string;
  value: any;
}
