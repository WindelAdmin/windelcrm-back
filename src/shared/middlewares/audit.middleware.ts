export const GenerateAudit = (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) => {
  const originalMethod = descriptor.value

  descriptor.value = async function (...args: any[]) {
    try {
      const result = await originalMethod.apply(this, args)
      console.log('Resultado da função:', result)
      return result
    } catch (err) {
      console.error('Erro na função:', err)
      throw err
    }
  }
}
