import * as deepExtend from 'extend';

/**
 * `_.get`, obtiene el valor seguro de acuerdo con` path`
 * jsperf: https://jsperf.com/es-deep-getttps://jsperf.com/es-deep-get
 *
 * @param obj 数据源，无效时直接返回 `defaultValue` 值
 * @param path 若 `null`、`[]`、未定义及未找到时返回 `defaultValue` 值
 * @param defaultValue 默认值
 */
export function deepGet(obj: any, path: string | string[], defaultValue?: any) {
  if (!obj || path == null || path.length === 0) {
    return defaultValue;
  }
  if (!Array.isArray(path)) {
    // tslint:disable-next-line:no-bitwise
    path = ~path.indexOf('.') ? path.split('.') : [ path ];
  }
  if (path.length === 1) {
    const checkObj = obj[path[0]];
    return typeof checkObj === 'undefined' ? defaultValue : checkObj;
  }
  return path.reduce((o, k) => (o || {})[k], obj) || defaultValue;
}

export function deepCopy(obj: any) {
  const result = deepExtend(true, { }, { _: obj });
  return result._;
}

/** Copie el contenido al portapapeles */
export function copy(value: string): Promise<string> {
  return new Promise<string>((resolve, reject): void => {
    let copyTextArea = null as HTMLTextAreaElement;
    try {
      copyTextArea = document.createElement('textarea');
      copyTextArea.style.height = '0px';
      copyTextArea.style.opacity = '0';
      copyTextArea.style.width = '0px';
      document.body.appendChild(copyTextArea);
      copyTextArea.value = value;
      copyTextArea.select();
      document.execCommand('copy');
      resolve(value);
    } finally {
      if (copyTextArea && copyTextArea.parentNode) {
        copyTextArea.parentNode.removeChild(copyTextArea);
      }
    }
  });
}
