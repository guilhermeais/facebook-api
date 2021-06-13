import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { User } from 'App/Models'
import { UpdateValidator } from 'App/Validators/User/Main'

export default class UsersController {
  public async index({ request }: HttpContextContract) {
    const user = User.query().where((builder) => {
      if (request.qs().keyword) {
        builder
          .where('name', 'LIKE', `%${String(request.qs().keyword) || ''}%`)
          .orWhere('email', 'LIKE', `%${String(request.qs().keyword) || ''}%`)
          .orWhere('username', 'LIKE', `%${String(request.qs().keyword) || ''}%`)
      }
    })

    return user
  }

  public async show({ auth }: HttpContextContract) {
    const user = auth.user!

    await user.load('avatar')

    return user.serialize({
      fields: {
        omit: ['rememberMeToken'],
      },
    })
  }

  public async update({ request, auth }: HttpContextContract) {
    const data = await request.validate(UpdateValidator)
    const user = auth.user!

    user.merge(data)

    await user.save()

    return user
  }
}
