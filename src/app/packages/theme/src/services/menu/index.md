#Menu Service
El formato de datos del servicio de menú es una matriz `menu` donde el atributo `text` indica que el texto del menú es obligatorio y es él mismo No se ve afectado por componentes externos como el componente `sidebar-nav`, porque los menús son una parte integral del proyecto, y es más eficiente separarlos en un solo servicio. Usado, por ejemplo: generar dinámicamente navegación, título, etc.

**Sugerencias:** Inicie el servicio en Angular en `startup.service.ts`, después de obtener los datos del menú, llame al método `add()`

## API

| Nombre de interfaz | Parámetros | Descripción |
| ------------------ | ---------- | ----------- |
| `add` | `items: Menu[]` | Configuración de datos del menú |
| `clear` | - | Borrar datos del menú |
| `resume` | `callback: Funection` | Restablecer menú, puede necesitar llamar a actualizar cuando I18N o los permisos de usuario cambian |
| `openedByUrl` | `url: string` | Según el menú de configuración de atributo URL `_open` (`_open` se usa para expandir el valor de condición del menú) |
| `getPathByUrl` | `url: string` | Obtener lista de menú basada en URL |
