# Other

## isEmpty

Se usa para verificar que `<ng-content></ng-content>` esté vacío, es útil para los componentes personalizados.

## toBoolean

Convierte el atributo a `boolean`

## toNumber

Convierte el atributo a `number`

## deepGet

Similar a `_.get`, obtenga el valor de seguridad de acuerdo con `path`.

```ts
const obj = {
  id: 1,
  user: {
    name: 'some name',
    age: 18
  }
};

deepGet(obj, 'id'); // 1
deepGet(obj, 'user.age'); // 18
```

## deepCopy

Copia profunda

```ts
const source = { a: 1, user: { name: 'some name' } };
const obj = deepCopy(source);
```

## copy

Copie el contenido al portapapeles.

## updateHostClass

Actualice el estilo de componente de host `class`, por ejemplo:

```ts
updateHostClass(
  this.el.nativeElement,
  this.renderer,
  {
    [ 'classname' ]: true,
    [ 'classname' ]: this.type === '1',
    [ this.cls ]: true,
    [ `a-${this.cls}` ]: true
  }
)
```
