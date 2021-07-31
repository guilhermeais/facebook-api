import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { User } from 'App/Models'
import { UpdateValidator } from 'App/Validators/User/Main'

export default class UsersController {
  public async index({ request, response, auth }: HttpContextContract) {
    const { keyword } = request.get()

    if (!keyword) {
      return response.status(422).send({
        error: { message: 'missing user parameter' },
      })
    }
    const user = User.query()
      .where((builder) => {
        if (request.qs().keyword) {
          builder
            .where('name', 'LIKE', `%${String(request.qs().keyword)}%`)
            .orWhere('email', 'LIKE', `%${String(request.qs().keyword)}%`)
            .orWhere('username', 'LIKE', `%${String(request.qs().keyword)}%`)
        }
      })
      .preload('avatar')

    return user
  }
}
