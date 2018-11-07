# Time

## getTimeDistance

Obtenga el intervalo de tiempo y devuelva `[Date, Date]` para las fechas de inicio y finalización, por ejemplo: Obtenga esta semana:

```ts
getTimeDistance('week')
```

**parámetro**

- `type` Tipo de atajo con `-` para el tiempo pasado, si `number` se especifica por días
  - `today`、`-today` día
  - `week`、`-week` semana
  - `month`、`-month` mes
  - `year`、`-year` año
- `time` Especifique la hora de inicio, el valor predeterminado es: `now`
