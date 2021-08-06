import { ObjectSchema } from 'joi'

type Error = {
  [x: string]: string;
}

const formatError = (error) =>
  error.details.map(({ message, path, type }) => ({
    field: path.join('.'),
    rule: type,
    message,
  }));

export default (schema: ObjectSchema, validationTarget: object): Error | void => {
  const { error } = schema.validate(validationTarget, { abortEarly: false, convert: false })

  if (!error || !error.details) {
    return
  }

  if (error && error.details) {
    return formatError(error);
  }
}
