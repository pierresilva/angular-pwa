# Validate

## API

Nombre del método | Descripción | Ejemplo
------------------|-------------|--------
`isNum` | Si es un número | -
`isInt` | Si es un número entero | -
`isDecimal` | Si es un decimal | -
`isIdCard` | Si es una identificación | -
`isMobile` | Si es un número de teléfono móvil | -

Cada tipo de validación se incluye con el validador de formulario:

```ts
this.valForm = fb.group({
  // Número de teléfono móvil
  mobile: [null, Validators.compose([Validators.required, _Validators.mobile])]
});
```
