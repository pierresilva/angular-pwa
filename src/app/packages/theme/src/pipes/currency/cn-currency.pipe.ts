import { Pipe } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

// tslint:disable-next-line:use-pipe-transform-interface
@Pipe({ name: '_currency' })
export class CNCurrencyPipe extends CurrencyPipe {
  transform(
    value: any,
    currencyCode: string = '$COP',
    display: 'code' | 'symbol' | 'symbol-narrow' | boolean = 'code',
    digits?: string,
  ): string | null {
    return super.transform(value, currencyCode, <any>display, digits);
  }
}
