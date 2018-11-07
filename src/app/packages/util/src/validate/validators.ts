import { AbstractControl, ValidationErrors } from '@angular/forms';
import { isNum, isInt, isDecimal, isIdCard, isMobile } from './validate';

/** un conjunto de validadores diarios */
// tslint:disable-next-line:class-name
export class _Validators {
  /** Si es un número */
  static num(control: AbstractControl): ValidationErrors | null {
    return isNum(control.value) ? null : { num: true };
  }

  /** Si es un número entero */
  static int(control: AbstractControl): ValidationErrors | null {
    return isInt(control.value) ? null : { int: true };
  }

  /** Si es un decimal */
  static decimal(control: AbstractControl): ValidationErrors | null {
    return isDecimal(control.value) ? null : { decimal: true };
  }

  /** Si es una identificación */
  static idCard(control: AbstractControl): ValidationErrors | null {
    return isIdCard(control.value) ? null : { idCard: true };
  }

  /** Si es un número de teléfono móvil */
  static mobile(control: AbstractControl): ValidationErrors | null {
    return isMobile(control.value) ? null : { mobile: true };
  }
}
