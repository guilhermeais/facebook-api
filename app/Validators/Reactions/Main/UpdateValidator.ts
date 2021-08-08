import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { reactionsTypes } from 'App/utils/reactionsTypes'

export default class UpdateValidateValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    type: schema.enum(reactionsTypes),
    postId: schema.number([rules.exists({ table: 'posts', column: 'id' })]),
  })

  public cacheKey = this.ctx.routeKey

  public messages = {}
}
