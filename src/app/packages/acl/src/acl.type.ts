export interface ACLType {
  /**
   * Rol
   */
  role?: string[];
  /**
   * Habilidad
   */
  ability?: number[] | string[];

  /**
   * Modo de verificación, predeterminado: `oneOf`
   * - `allOf` Indica que todos los roles o matrices de puntos de permiso deben ser válidos
   * - `oneOf` Indica que solo uno de los roles o matrices de puntos de permiso es válido.
   */
  mode?: 'allOf' | 'oneOf';

  [key: string]: any;
}

export type ACLCanType = number | number[] | string | string[] | ACLType;
