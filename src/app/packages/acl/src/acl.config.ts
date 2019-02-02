export class AppACLConfig {
  /**
   * Salte después de que falla el guardián de ruta, por defecto: `/403`
   */
  guard_url ?= '/errors/403';
}
