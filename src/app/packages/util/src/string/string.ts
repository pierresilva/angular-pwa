import { deepGet } from '../other/other';

/**
 * Formato de cadena de texto
 * ```
 * format('this is ${name}', { name: 'asdf' })
 * // output: this is asdf
 * format('this is ${user.name}', { user: { name: 'asdf' } }, true)
 * // output: this is asdf
 * ```
 */
export function format(str: string, obj: {}, needDeepGet = false): string {
  return (str || '').replace(
    /\${([^}]+)}/g,
    (work: string, key: string) =>
      needDeepGet
        ? deepGet(obj, key.split('.'), '')
        : (obj || {})[key] || '',
  );
}

/**
 * Convertir a metadato de RMB
 * @param digits Cuando se permite el tipo de número,
 *               el número de dígitos después del punto decimal,
 *               el valor predeterminado es 2 decimales.
 */
export function pesos(value: any, digits: number = 2): string {
  if (typeof value === 'number') {
    value = value.toFixed(digits);
  }
  return `$${value}`;
}
