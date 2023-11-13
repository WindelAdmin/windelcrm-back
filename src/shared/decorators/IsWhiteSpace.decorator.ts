import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ name: 'isWhitespace', async: false })
class IsWhitespaceConstraint implements ValidatorConstraintInterface {
  validate(value: any, _args: ValidationArguments) {
    if (typeof value !== 'string') {
      return false;
    }
    return value.trim() !== '';
  }

  defaultMessage() {
    return 'O campo deve não conter apenas espaços em branco';
  }
}

export function IsWhitespace(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsWhitespaceConstraint,
    });
  };
}
