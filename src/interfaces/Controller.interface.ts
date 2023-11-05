export default interface IController<C, U, R> {
  create(data: C): Promise<void>
  update(id: number, data: U): Promise<void>
  delete(id: number): Promise<void>
  findById(id: number): Promise<R>
  findAll(): Promise<R[]>
}
