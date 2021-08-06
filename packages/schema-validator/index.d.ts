import { ObjectSchema } from 'joi'

declare namespace validateSchema {
  export function validateSchema (schema: ObjectSchema, validationTarget: object): Error | void
}

export = validateSchema
