import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { User } from 'App/Models'

export default class ProfilesController {
  public async show({ request, auth }: HttpContextContract) {
    const { username } = request.qs()

    const user = await User.query()
      .where({ username })
      .preload('avatar')
      .withCount('posts')
      .withCount('followers')
      .withCount('following')
      .firstOrFail()

    if (user.id !== auth.user!.id) {
      const isFollowing = await user
        .related('followers')
        .query()
        .where('follower_id', auth.user!.id)
        .first()

      user.$extras.isFollowing = isFollowing ? true : false
    }

    return user.serialize({
      fields: {
        omit: ['email', 'createdAt', 'udpatedAt', 'remerberMeToken'],
      },
    })
  }
}
