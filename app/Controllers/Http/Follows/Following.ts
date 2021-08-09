import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { User } from 'App/Models'
import { isFollowing } from 'App/utils/isFollowing'

export default class FollowsController {
  public async index({ request, response, auth }: HttpContextContract) {
    const { username } = request.qs()

    // if (!username) {
    //   return response.badRequest({ error: { message: 'missing username' } })
    // }

    const user = (await User.findBy('username', username)) || auth.user!

    await user.load('following')

    const queries = user.following.map(async (user) => {
      await isFollowing(user, auth)
    })

    await Promise.all(queries)

    return user.following
  }
}
