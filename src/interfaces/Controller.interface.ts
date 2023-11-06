export default interface IController<C, U, D, R> {
  create(data: C): Promise<void>
  update(id: number, data: U): Promise<void>
  delete(params: D): Promise<void>
  findById(id: number): Promise<R>
  findAll(): Promise<R[]>
}
