import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'

export default class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    key: schema.string({trim: true}, [rules.exists({table: 'user_keys', column: 'key'})]),
    name: schema.string({trim:true}),
    password: schema.string({trim:true}, [rules.confirmed('passwordConfirmation')])
  })

  public messages = {}
}
