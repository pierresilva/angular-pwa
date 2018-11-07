# Rule

Mock es un objeto `Objeto`, la clave es la declaración del campo de solicitud y el valor es el contenido de la respuesta, por ejemplo:

```ts
export const USERS = {
  'GET /users': { users: [1, 2], total: 2 },
}
```

Cuando se accede a través de `HttpClient.get('/users')`, devolverá `{users: [1, 2], total: 2}` directamente, y no enviará ninguna solicitud HTTP, puede ver el panel de `Network` para confirmarlo.

## Key solicitud de declaración de dominio

Use `' '` espacio para separar el método de solicitud y la URL, el método de solicitud puede ignorarse, el valor predeterminado es `GET`; la URL admite parámetros de enrutamiento y expresiones regulares. Algunas claves válidas:

```ts
export const USERS = {
  'GET /users': null,
  // GET Puede ser omitido
  '/users/1': null,
  // Solicitud POST 
  'POST /users/1': null,
  // Parámetro de ruta
  '/users/:id': null,
  // Use () para expresión regular
  '/data/(.*)': null
};
```

> El valor del parámetro de ruta se obtiene mediante `MockRequest`.

## Value Contenido de respuesta

El contenido de la respuesta solo admite tres tipos: `Object`、`Array`、`(req: MockRequest) => any`

```ts
import { MockStatusError } from '@app/mock';

export const USERS = {
  // Array
  '/users': [ { uid: 1 }, { uid: 2 } ],
  // Object
  '/users': { uid: 1 },
  // Function
  '/qs': (req: MockRequest) => req.queryString.pi,
  // Enviar error de estado
  '/404': () => { throw new MockStatusError(404); }
};
```

### MockRequest

Nombre          | Tipo               | Descripción
----------------|--------------------|------------------------------------------------------------------
`[params]`      | `any`              | Parámetro de ruta, `/: id` luego` params.id`
`[queryString]` | `any`              | Parámetro de URL, `/users?pi=1&ps=10` -> `queryString.pi`、`queryString.ps`
`[headers]`     | `any`              | Valores para Headers
`[body]`        | `any`              | Cuerpo de la solicitud
`[original]`    | `HttpRequest<any>` | `HttpRequest` Original

### MockStatusError

Cuando desee responder a una excepción `404`.

## Algunos ejemplos

```ts
import { MockStatusError } from '@app/mock';

export const USERS = {
  // Los valores soportados son Object y Array
  'GET /users': { users: [1, 2], total: 2 },
  // GET Puede ser omitido
  '/users/1': { users: [1, 2], total: 2 },
  // Solicitud POST
  'POST /users/1': { uid: 1 },
  // Obtener los parámetros de solicitud queryString, headers, body
  '/qs': (req: MockRequest) => req.queryString.pi,
  // Parámetro de ruta
  '/users/:id': (req: MockRequest) => req.params, // /users/100, output: { id: 100 }
  // Enviar error de estado
  '/404': () => { throw new MockStatusError(404); },
  // Use () para indicar: expresión regular
  '/data/(.*)': (req: MockRequest) => req
};
```

## Regla de almacenamiento

En general, se requiere Mock durante el desarrollo, por lo que se recomienda crear un directorio `_mock` en el directorio raíz del proyecto y crear un archivo `index.ts` para exportar todas las reglas de datos.
