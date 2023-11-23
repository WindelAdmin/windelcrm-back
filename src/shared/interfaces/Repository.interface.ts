export default interface IRepository <E> {
  create(entity: E): Promise<void>
  update(entity: E): Promise<void>
  delete(id: number): Promise<void>
  findById(id: number): Promise<any>
  findAll(companyId: number): Promise<any[]>
}