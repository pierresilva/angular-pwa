# Util

@app/util es una colección de funciones de herramientas que se usan comúnmente todos los días.

## Como usar

Instale el módulo `@app/util`：

```bash
yarn add @app/util
```

Importe el módulo `AppUtilModule`：

```typescript
import { AppUtilModule } from '@app/util';

@NgModule({
  imports: [
    AppUtilModule.forRoot()
  ]
})
export class AppModule { }
```

## DelonUtilConfig

Elementos de configuración comunes, como la unificación del nombre de asignación para `ArrayService`.

```ts
import { AppUtilConfig } from '@app/abc';
export function fnAppUtilConfig(): AppUtilConfig {
  return Object.assign(new AppUtilConfig(), <AppUtilConfig>{
    array: {
      idMapName: 'id',
      parentIdMapName: 'parent_id'
    }
  });
}

@NgModule({ })
export class AppModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppModule,
      providers: [
        { provide: AppUtilConfig, useFactory: fnAppUtilConfig }
      ]
    };
  }
}
```

## Cómo llamar a una plantilla HTML

```ts
import { Component } from '@angular/core';
import { pesos } from '@app/util';

@Component({
  selector: 'app-demo',
  template: `
  {{pesos(11111)}}
  `
})
export class AppComponent {
  pesos = pesos;
}
```
