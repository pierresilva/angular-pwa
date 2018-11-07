#Cache

Algunos datos remotos usualmente se almacenan en caché en la memoria o `localStorage` con el propósito de reducir el costo de las solicitudes Http, tales datos son usualmente diccionario, datos de ciudad, etc.

La adquisición de caché debe ser muy simple, no debemos perder tiempo en cómo asegurar que esto esté cargado, por lo que `@app/cache` se basa más en **convención**. `key` es el valor clave único de la memoria caché. No debe ser solo un identificador. Es más valioso si se adhiere a ciertas convenciones. Por defecto `@app/cache`, no solo se trata `key` como un identificador único, también es un HTTP válido para obtener datos remotos, por ejemplo:

```ts
cacheService.get('/data/unit');
```

En el pasado, pensamos que deberíamos agregar uno antes：

```ts
cacheService.set('/data/unit', [ 'some', 'other' ]);
```

Solo para garantizar que se obtienen los datos en caché.

Para `@app/cache`, no necesita el método `set`, simplemente use `get` para obtener el diccionario de la unidad, porque tenemos **consulta**, cuando el caché no existe a través de `key` como una solicitud HTTP los datos se guardan en caché y se devuelven.

La caché se obtiene y configura por [CacheService](/cache/service). Solo necesita importar `CacheService` en la clase correspondiente.

## Cómo usar

**Instalación**

```bash
yarn add @app/cache
```

**Registro**

Importe `AppCacheModule` en el módulo raíz `AppModule`;

```ts
import { AppCacheModule } from '@app/cache';

@NgModule({
  imports: [
    AppCacheModule.forRoot()
  ]
})
```

**Nota** Se recomienda importar en el módulo raíz ya que es un servicio, para evitar la importación de duplicados.

### CacheOptions

`AppCacheModule.forRoot({})` el único parámetro es `CacheOptions`：

| Nombre del parámetro | Tipo | Predeterminado | Descripción |
| -------------------- | ---- | -------------- | ----------- |
| `[mode]` | `promise,none` | `promise` | Modo de caché; modo de convención `promise`, que permite que `key` obtenga datos como http; `none` modo normal |
| `[reName]` | `string` | - | Cambia el nombre del parámetro de retorno, por ejemplo: `null` retorna body como contenido `list` retorna body como `{list: []}` `result.list` retorna body como `{result: { Lista: []}}` |
| `[prefix]` | `string` | - | Prefijo de clave de datos persistentes |
| `[meta_key]` | `string` | `__cache_meta` | Nombre de clave de almacenamiento de metadatos de datos persistentes |
