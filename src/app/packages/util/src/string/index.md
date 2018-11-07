# String

## format

Formato de cadena de texto.

```ts
format('this is ${name}', { name: 'asdf' })
// output: this is asdf
format('this is ${user.name}', { user: { name: 'asdf' } }, true)
// output: this is asdf
```

**parámetro**

- `str: string` plantilla
- `obj: {}` objeto de datos
- `needDeepGet = false` Si se requiere una búsqueda profunda,`${user.address.city}` es compatible.

## pesos

Convierte a una meta cadena de RMB.

```ts
pesos(100)
// output: $100
```

> Devuelve `$pesos` de un conjunto de caracteres HTML, por lo que debe analizarse con `[innerHTML]`.
