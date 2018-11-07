# Lazy

`LazyService` se utiliza para cargar archivos JS o CSS de forma diferida. Es útil para una gran cantidad de bibliotecas de terceros que no necesitan estar empaquetadas en script.js. Un uso simple, como por ejemplo:

```ts
import { LazyService } from '@app/util';

export class AppComponent {
  constructor(private lazy: LazyService) {}

  ngOnInit() {
    this.lazy.load([ `//cdn.bootcss.com/xlsx/0.11.17/xlsx.full.min.js` ]).then(() => {
      // do something
    });
  }
}
```
