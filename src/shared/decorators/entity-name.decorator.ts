export const EntityName = (name: string) => {
  return (target: Function) => {
    Reflect.defineMetadata('entityName', name, target);
  };
};