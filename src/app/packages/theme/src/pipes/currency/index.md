#Currency

`_currency` formato de monedá, simplificando la `currency` original para los problemas de formato **moneda china**, de la misma manera que `currenty`.

```html
{{data.price | _currency}}
```

Salida:

```
$4.035.173,71
```

**No olvide registrar la configuración regional en el módulo raíz:**

```typescript
import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es';
registerLocaleData(localeEs);

{ provide: LOCALE_ID, useValue: 'es' }
```
