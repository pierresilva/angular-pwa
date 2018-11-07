// https://angular.io/guide/styleguide#style-04-12
export function throwIfAlreadyLoaded(parentModule: any, moduleName: string) {
  if (parentModule) {
    throw new Error(`${moduleName} ya fue cargado. Importe módulos Core solo en AppModule.`);
  }
}
