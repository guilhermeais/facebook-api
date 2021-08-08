import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { User } from 'App/Models'

export default class ProfilesController {
  public async show({ request }: HttpContextContract) {
    const { username } = request.qs()

    const user = await User.query()
      .where({ username })
      .preload('avatar')
      .withCount('posts')
      .withCount('followers')
      .withCount('following')
      .firstOrFail()

    return user.serialize({
      fields: {
        omit: ['email', 'createdAt', 'udpatedAt', 'remerberMeToken'],
      },
    })
  }
}
