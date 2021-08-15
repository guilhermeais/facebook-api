import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SotreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    content: schema.string({ trim: true }),
    receiverId: schema.number([rules.exists({ table: 'users', column: 'id' })]),
  })

  public cacheKey = this.ctx.routeKey

  public messages = {}
}
