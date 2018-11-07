import * as parse from 'date-fns/parse';
import * as startOfWeek from 'date-fns/start_of_week';
import * as endOfWeek from 'date-fns/end_of_week';
import * as subWeeks from 'date-fns/sub_weeks';
import * as startOfMonth from 'date-fns/start_of_month';
import * as endOfMonth from 'date-fns/end_of_month';
import * as subMonths from 'date-fns/sub_months';
import * as startOfYear from 'date-fns/start_of_year';
import * as endOfYear from 'date-fns/end_of_year';
import * as subYears from 'date-fns/sub_years';
import * as addDays from 'date-fns/add_days';

/**
 * Obtener rango de tiempo
 * @param type Escribir con `-` indica el tiempo pasado, si `number` se especifica para indicar el número de días
 * @param time Hora de inicio
 */
export function getTimeDistance(
  type:
    | 'today'
    | '-today'
    | 'week'
    | '-week'
    | 'month'
    | '-month'
    | 'year'
    | '-year'
    | number,
  time?: Date | string | number,
): [Date, Date] {
  time = parse(time || new Date());

  switch (type) {
    case 'today':
    case '-today':
      return [time, time];
    case 'week':
      return [startOfWeek(time), endOfWeek(time)];
    case '-week':
      return [startOfWeek(subWeeks(time, 1)), endOfWeek(subWeeks(time, 1))];
    case 'month':
      return [startOfMonth(time), endOfMonth(time)];
    case '-month':
      return [startOfMonth(subMonths(time, 1)), endOfMonth(subMonths(time, 1))];
    case 'year':
      return [startOfYear(time), endOfYear(time)];
    case '-year':
      return [startOfYear(subYears(time, 1)), endOfYear(subYears(time, 1))];
    default:
      return type > 0
        ? [time, addDays(time, type)]
        : [addDays(time, type), time];
  }
}
