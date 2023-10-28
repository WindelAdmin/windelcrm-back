export default interface IRepository<Entity> {
  save(entity: Entity): Promise<void>
  update(id: number, data: Entity): Promise<void>
  delete(id: number): Promise<void>
}
