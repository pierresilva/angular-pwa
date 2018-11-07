## Cache API

### set()

| Nombre del parámetro | Tipo | Descripción |
| -------------------- | ---- | ----------- |
| `key` | `string` | Identificador único de caché |
| `data` | `any | Observable<any>` | Fuente de datos de caché, cuando la fuente de datos es `Observable`, todavía devuelve `Observable`; de lo contrario, devuelve `void` |
| `options` | `{ type?: 'm' | 's', expire?: number }` | `type` tipo de almacenamiento, 'm' para memoria, 's' para persistente `expire` tiempo de expiración, en `segundos` |

### get()

| Nombre del parámetro | Tipo | Descripción |
| -------------------- | ---- | ----------- |
| `key` | `string` | Identificador único de caché |
| `options` | `{ mode?: 'promise' | 'none', type?: 'm' | 's', expire?: number }` | `mode` Especifique el modo para obtener el caché: 1、`promise` significa que si` key` no está almacenado, `key` se solicita cuando la URL se guarda en caché y se devuelve a `Observable`. 2、`none` significa devolver datos directamente. Si `key` no existe, devuelve `null` directamente. `type` tipo de almacenamiento, 'm' para memoria, 's' para persistente `expire` tiempo de expiración, en `segundos` |

### getNone('key')

Obtenga datos en caché, o null si `key` no existe o ha expirado.

### tryGet()

Obtenga el caché, si no, configure el objeto de caché, el parámetro es equivalente a `set()`.

### has('key')

Guardado en caché? `key`.

### remove('key')

Eliminar de caché `key`。

### clear()

Borre todos los cachés.

### notify('key')

Monitor de `key`, cuando` key` cambia, caduca y elimina las notificaciones, tenga en cuenta los siguientes detalles:

- Llamar a `cancelNotify` de nuevo después de la llamada; de lo contrario, nunca caducará
- El oyente realiza una comprobación de caducidad cada `freq` (valor predeterminado: 3 segundos)

### cancelNotify('key')

Cancelar el monitor de `key`

### hasNotify('key')

Si `key` ha sido monitoreado

### clearNotify('key')

Borrar a todos los monitoreos de `key`

### freq()

Configure la frecuencia de monitoreo en milisegundos y el mínimo de `20ms`. El valor predeterminado es` 3000ms`.

## Diferencia entre `get` y `tryGet`

La esencia es obtener y devolver los datos en caché, `get` se simplifica más que` tryGet`, el primero es el estilo de la convención de URL por `key`, el último necesita especificar el objeto de fuente de datos.

## Operación fresca

### async Pipe

La combinación de Pipes RxJS y `async` puede ayudarnos a utilizar datos en caché muy amigables, por ejemplo:

```ts
@Component({
  template: `<li *ngFor="let unit of units | async">{{unit}}</li>`
})
export class Component {
  units: this.cacheService.get('/data/unit')
}
```

### Caché y solicitud

A veces, cuando necesita confiar en un diccionario para obtener datos remotos:

```ts
this.srv
  .get('/data/unit')
  .pipe(
    map(units => this.http.get(`/trade?unit=${units}`))
  );
```
