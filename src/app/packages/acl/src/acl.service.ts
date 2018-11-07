import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ACLType, ACLCanType } from './acl.type';

/**
 * Servicio de control de acceso
 */
@Injectable()
export class ACLService {
  private roles: string[] = [];
  private abilities: (number | string)[] = [];
  private full = false;
  private aclChange: BehaviorSubject<ACLType | boolean> = new BehaviorSubject<
    ACLType | boolean
    >(null);

  /** Notificación de cambio de ACL */
  get change(): Observable<ACLType | boolean> {
    return this.aclChange.asObservable();
  }

  /** Obtener todos los datos */
  get data() {
    return {
      full: this.full,
      roles: this.roles,
      abilities: this.abilities,
    };
  }

  private parseACLType(val: string | string[] | ACLType): ACLType {
    if (typeof val !== 'string' && !Array.isArray(val)) {
      return <ACLType>val;
    }
    if (Array.isArray(val)) {
      return <ACLType>{ role: <string[]>val };
    }
    return <ACLType>{
      role: [val],
    };
  }

  /**
   * Establecer la función de usuario actual o las capacidades de permiso (se borrará todo primero)
   */
  set(value: ACLType) {
    this.abilities = [];
    this.roles = [];
    this.add(value);
    this.aclChange.next(value);
  }

  /**
   * Identifica al usuario actual como completo, es decir, ilimitado
   */
  setFull(val: boolean) {
    this.full = val;
    this.aclChange.next(val);
  }

  /**
   * Establecer las capacidades actuales de permiso de usuario (se borrarán todas primero)
   */
  setAbility(abilities: (number | string)[]) {
    this.set(<ACLType>{ ability: abilities });
  }

  /**
   * Establecer el rol de usuario actual (se borrará todo primero)
   */
  setRole(roles: string[]) {
    this.set(<ACLType>{ role: roles });
  }

  /**
   * Agregar rol o permiso al usuario actual
   */
  add(value: ACLType) {
    if (value.role && value.role.length > 0) {
      this.roles.push(...value.role);
    }
    if (value.ability && value.ability.length > 0) {
      this.abilities.push(...value.ability);
    }
  }

  /**
   * Adjuntar un rol al usuario actual
   */
  attachRole(roles: string[]) {
    for (const val of roles) {
      if (!this.roles.includes(val)) {
        this.roles.push(val);
      }
    }
    this.aclChange.next(this.data);
  }

  /**
   * Adjunte permisos al usuario actual
   */
  attachAbility(abilities: (number | string)[]) {
    for (const val of abilities) {
      if (!this.abilities.includes(val)) {
        this.abilities.push(val);
      }
    }
    this.aclChange.next(this.data);
  }

  /**
   * Eliminar el rol para el usuario actual
   */
  removeRole(roles: string[]) {
    for (const val of roles) {
      const idx = this.roles.indexOf(val);
      if (idx !== -1) {
        this.roles.splice(idx, 1);
      }
    }
    this.aclChange.next(this.data);
  }

  /**
   * Eliminar permisos para el usuario actual
   */
  removeAbility(abilities: (number | string)[]) {
    for (const val of abilities) {
      const idx = this.abilities.indexOf(val);
      if (idx !== -1) {
        this.abilities.splice(idx, 1);
      }
    }
    this.aclChange.next(this.data);
  }

  /**
   * Si el usuario actual tiene un rol correspondiente, de hecho, `number` significa Ability
   *
   * - Devuelve `true` cuando` full: true` o argument `null`
   * - Si usa el parámetro `ACLType`, puede especificar el modo de verificación `mode`.
   */
  can(roleOrAbility: ACLCanType): boolean {
    if (this.full === true || !roleOrAbility) {
      return true;
    }

    let t: ACLType = {};
    if (typeof roleOrAbility === 'number') {
      t = { ability: [roleOrAbility] };
    } else if (
      Array.isArray(roleOrAbility) &&
      roleOrAbility.length > 0 &&
      typeof roleOrAbility[0] === 'number'
    ) {
      t = { ability: roleOrAbility };
    } else {
      t = this.parseACLType(roleOrAbility);
    }

    if (t.role) {
      if (t.mode === 'allOf') {
        return t.role.every(v => this.roles.includes(v));
      } else {
        return t.role.some(v => this.roles.includes(v));
      }
    }
    if (t.ability) {
      if (t.mode === 'allOf') {
        return (t.ability as any[]).every(v => this.abilities.includes(v));
      } else {
        return (t.ability as any[]).some(v => this.abilities.includes(v));
      }
    }
    return false;
  }

  /** @inner */
  parseAbility(value: ACLCanType): ACLCanType {
    if (
      typeof value === 'number' ||
      typeof value === 'string' ||
      Array.isArray(value)
    ) {
      value = <ACLType>{ ability: Array.isArray(value) ? value : [value] };
    }
    delete value.role;
    return value;
  }

  /**
   * Si el usuario actual tiene la habilidad correspondiente
   */
  canAbility(value: ACLCanType): boolean {
    return this.can(this.parseAbility(value));
  }
}
