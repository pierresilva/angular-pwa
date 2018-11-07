# Mock

**Mock** se refiere al desarrollo front-end independiente del back-end mediante la generación de datos de simulación, y en ocasiones también lo usamos en el entorno de prueba.

`@app/mock` es una característica simulada simple que incluye las siguientes características:

- Cualquier proyecto angular
- Desarrollo sin intrusión
- Uso ultra simple
- Soporte [mock.js](http://mockjs.com/)

## Cómo usar

Instale el paquete de dependencia `@app/mock`:

```bash
yarn add @app/mock -D
```

Importar [Mock](/mock/rule) y `AppMockModule` en el módulo raíz` AppModule`;

```ts
import { DelonMockModule } from '@delon/mock';
import * as MOCKDATA from '../../_mock';
// Solo válido para entornos de desarrollo
import { environment } from '../environments/environment';
const MOCKMODULE = !environment.production ? [ AppnMockModule.forRoot({ data: MOCKDATA }) ] : [];

@NgModule({
  imports: [
    ...MOCKMODULE
  ]
})
```

### MockOptions Configuración

`forRoot` 参数还包括：

| Nombre del parámetro | Tipo | Predeterminado | Descripción |
| -------------------- | ---- | -------------- | ----------- |
| `[data]` | `any` | - | Mock Regla de datos |
| `[delay]` | `number` | `300` | Solicitar demora, en milisegundos|
| `[force]` | `boolean` | `false` | Forzar todas las solicitudes a Mock, `true` significa devolver un error 404 directamente cuando la URL solicitada no existe, `false` significa enviar una solicitud HTTP real cuando la solicitud se pierde |
| `[log]` | `boolean` | `true` | Si se imprime la información de solicitud falsa para compensar el navegador sin la información de red, cuando la solicitud pasa el simulacro, recibirá [👽Mock] |

> Si el submódulo también debe utilizarse para garantizar que el interceptor HTTP sea válido, generalmente puede usar `forChild` directamente en el `SharedModule`.

### Por qué solo es válido para el entorno de desarrollo?

Los simulacros no son datos reales, la mayoría de los escenarios son para entornos de desarrollo local o de prueba, por lo que los módulos de Mock y los datos de reglas no deben incluirse en los entornos de producción. Por lo tanto, lo anterior determinará que se debe cargar `AppMockModule` de acuerdo con el entorno según con `!environment.production`.

Por supuesto, todavía puede usar esta regla en un entorno de producción, si necesita algunas solicitudes de simulación para mantener el entorno en funcionamiento.

```ts
import { AppMockModule } from '@app/mock';
import * as MOCKDATA from '../../_mock';
@NgModule({
  imports: [
    AppMockModule.forRoot({ data: MOCKDATA })
  ]
})
```
