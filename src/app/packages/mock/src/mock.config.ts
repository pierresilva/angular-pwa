export class AppMockConfig {
  /** Datos de definición de regla */
  data: any;
  /** Solicitar retraso, en milisegundos, predeterminado: `300` */
  // tslint:disable-next-line:whitespace
  delay?= 300;
  /**
   * Si forzar todas las solicitudes a Mock, `true` significa devolver un error 404 directamente cuando
   * la URL solicitada no existe, `false` significa enviar una solicitud
   * HTTP real cuando la solicitud se pierde
   */
  // tslint:disable-next-line:whitespace
  force?= false;
  /**
   * Debe imprimir la información de solicitud falsa para
   * compensar la falta de información en el navegador
   */
  // tslint:disable-next-line:whitespace
  log?= true;
}
