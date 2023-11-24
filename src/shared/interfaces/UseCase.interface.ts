export default interface IUseCase {
  execute(...params): Promise<any>
}
