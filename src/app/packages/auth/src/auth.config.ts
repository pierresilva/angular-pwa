export class AppAuthConfig {
  /**
   * Almacene el valor de KEY
   */
  store_key ?= '_token';
  /**
   * Ir a la página de inicio de sesión si no es válida, incluyendo:
   * - Valor de token no válido
   * - Token ha expirado (solo JWT)
   */
  token_invalid_redirect ?= true;
  /**
   * Tiempo de expiración del token, valor predeterminado: `10` segundos
   */
  token_exp_offset ?= 10;
  /**
   * Enviar nombre de parámetro para el token, predeterminado: token
   */
  token_send_key ?= 'token';
  /**
   * Enviar la plantilla del token (predeterminado: `$ {token}`), use `$ {token}`
   * para representar el marcador de posición del token, por ejemplo:
   *
   * - `Bearer ${token}`
   */
  token_send_template ?= '${token}';
  /**
   * Enviar la ubicación del parámetro token, por defecto: header
   */
  token_send_place?: 'header' | 'body' | 'url' = 'header';
  /**
   * URL de enrutamiento
   */
  login_url ?= `/login`;
  /**
   * Ignore la lista de direcciones URL de TOKEN, el valor predeterminado es：
   * [ /\/login/, /assets\//, /passport\// ]
   */
  ignores?: RegExp[] = [/\/login/, /assets\//, /passport\//];
  /**
   * Permitir clave de inicio de sesión anónima, si la CLAVE está incluida en el parámetro de solicitud, ignore TOKEN
   */
  allow_anonymous_key ?= `_allow_anonymous`;
}
