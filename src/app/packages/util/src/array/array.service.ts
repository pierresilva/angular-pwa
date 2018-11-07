import { Injectable } from '@angular/core';
import { AppUtilConfig } from '../util.config';
import { ArrayConfig } from './array.config';

@Injectable({ providedIn: 'root' })
export class ArrayService {
  private c: ArrayConfig;
  constructor(cog: AppUtilConfig) {
    this.c = Object.assign(
      <ArrayConfig>{
        deepMapName: 'deep',
        parentMapName: 'parent',
        idMapName: 'id',
        parentIdMapName: 'parent_id',
        childrenMapName: 'children',
        titleMapName: 'title',
        checkedMapname: 'checked',
        selectedMapname: 'selected',
        expandedMapname: 'expanded',
        disabledMapname: 'disabled',
      },
      cog && cog.array,
    );
  }
  /**
   * Convierta estructura de árbol a estructura de matriz
   */
  treeToArr(
    tree: any[],
    options?: {
      /** Nombre del elemento de profundidad, predeterminado: `'deep'` */
      deepMapName?: string;
      /** El nombre del elemento de datos padre de la matriz plana, por defecto: `'parent'` */
      parentMapName?: string;
      /** Nombre de subclave de datos de origen, predeterminado: `'children'` */
      childrenMapName?: string;
      /** Eliminar el nodo `children`, predeterminado:` true` */
      clearChildren?: boolean;
      /** Callback al convertir a estructura de matriz */
      cb?: (item: any, parent: any, deep: number) => void;
    },
  ): any[] {
    options = Object.assign(
      {
        deepMapName: this.c.deepMapName,
        parentMapName: this.c.parentMapName,
        childrenMapName: this.c.childrenMapName,
        clearChildren: true,
        cb: null,
      },
      options,
    );
    const result: any[] = [];
    const inFn = (list: any[], parent: any, deep: number) => {
      for (const i of list) {
        i[options.deepMapName] = deep;
        i[options.parentMapName] = parent;
        if (options.cb) {
          options.cb(i, parent, deep);
        }
        result.push(i);
        const children = i[options.childrenMapName];
        if (
          children != null &&
          Array.isArray(children) &&
          children.length > 0
        ) {
          inFn(children, i, deep + 1);
        }
        if (options.clearChildren) {
          delete i[options.childrenMapName];
        }
      }
    };
    inFn(tree, 1, null);
    return result;
  }

  /**
   * Matriz a datos de árbol
   */
  arrToTree(
    arr: any[],
    options?: {
      /** Número nombre del elemento ID, predeterminado: `'id'` */
      idMapName?: string;
      /** Nombre del elemento padre, predeterminado: `'parent_id'` */
      parentIdMapName?: string;
      /** Nombre del elemento hijos, predeterminado: `'children' */
      childrenMapName?: string;
      /** Callback al convertir a datos de árbol */
      cb?: (item: any) => void;
    },
  ): any[] {
    options = Object.assign(
      {
        idMapName: this.c.idMapName,
        parentIdMapName: this.c.parentIdMapName,
        childrenMapName: this.c.childrenMapName,
        cb: null,
      },
      options,
    );
    const tree: any[] = [];
    const childrenOf = {};
    for (const item of arr) {
      const id = item[options.idMapName],
        pid = item[options.parentIdMapName];
      childrenOf[id] = childrenOf[id] || [];
      item[options.childrenMapName] = childrenOf[id];
      if (options.cb) {
        options.cb(item);
      }
      if (pid) {
        childrenOf[pid] = childrenOf[pid] || [];
        childrenOf[pid].push(item);
      } else {
        tree.push(item);
      }
    }
    return tree;
  }

  /**
   * Acceso recursivo a todo el árbol
   */
  visitTree(
    tree: any[],
    cb: (item: any, parent: any, deep: number) => void,
    options?: {
      /** Nombre del elemento hijos, predeterminado: `'children'  */
      childrenMapName?: string;
    },
  ) {
    options = Object.assign(
      {
        childrenMapName: this.c.childrenMapName,
      },
      options,
    );
    const inFn = (data: any[], parent: any, deep: number) => {
      for (const item of data) {
        cb(item, parent, deep);
        const childrenVal = item[options.childrenMapName];
        if (childrenVal && childrenVal.length > 0) {
          inFn(childrenVal, item, deep + 1);
        }
      }
    };
    inFn(tree, null, 1);
  }

}
