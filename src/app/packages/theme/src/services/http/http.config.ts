export interface HttpClientConfig {
  /**
  * Procesamiento de valor nulo, predeterminado: `include`
  * - include: contiene
  * - ignore: ignorar
  */
  nullValueHandling?: 'include' | 'ignore';
  /**
   * Proceso de valor de tiempo, predeterminado: `timestamp`
   * - timestamp： Marca de tiempo
   * - ignore： Ignore el procesamiento y mantenga el estado original
   */
  dateValueHandling?: 'timestamp' | 'ignore';
}
