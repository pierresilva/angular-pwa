/** Si es un número */
export function isNum(value: string | number): boolean {
  return /^((-?\d+\.\d+)|(-?\d+)|(-?\.\d+))$/.test(value.toString());
}

/** Si es un número entero */
export function isInt(value: string | number): boolean {
  // tslint:disable-next-line:triple-equals
  return isNum(value) && parseInt(value.toString(), 10) == value;
}

/** Si es un decimal */
export function isDecimal(value: string | number): boolean {
  return isNum(value) && !isInt(value);
}

/** Si es una identificación */
export function isIdCard(value: any): boolean {
  return (
    typeof value === 'string' && /(^\d{15}$)|(^\d{17}([0-9]|X)$)/i.test(value)
  );
}

/** Si es un número de teléfono móvil */
export function isMobile(value: any): boolean {
  return (
    typeof value === 'string' &&
    /^(0|\+?86|17951)?(13[0-9]|15[0-9]|17[0678]|18[0-9]|14[57])[0-9]{8}$/.test(
      value,
    )
  );
}
