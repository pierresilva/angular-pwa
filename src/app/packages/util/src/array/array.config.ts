export interface ArrayConfig {
  /** Nombre del elemento de profundidad, por defecto: `'deep'` */
  deepMapName?: string;
  /** El nombre del elemento de datos padre de la matriz plana, por defecto: `'parent'` */
  parentMapName?: string;
  /** Número de nombre del elemento, por defecto: `'id'` */
  idMapName?: string;
  /** Nombre del elemento del padre principal, por defecto: `'parent_id'` */
  parentIdMapName?: string;
  /** Nombre de subclave de datos de origen, por defecto: `'children'` */
  childrenMapName?: string;
  /** Nombre del título del elemento, por defecto: `'title'` */
  titleMapName?: string;
  /** Si el nodo Checkbox selecciona el nombre del elemento, por defecto: `'checked'` */
  checkedMapname?: string;
  /** Si el nodo en sí selecciona el nombre del elemento, por defecto: `'selected'` */
  selectedMapname?: string;
  /** Si el nodo está expandido (el nodo de hoja no es válido) nombre del elemento, por defecto: `'expanded'` */
  expandedMapname?: string;
  /** Establece si se deshabilita el nodo (no se puede hacer ninguna operación) nombre del elemento, por defecto: `'disabled'` */
  disabledMapname?: string;
}
