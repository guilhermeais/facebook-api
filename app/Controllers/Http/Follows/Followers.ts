import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { User } from 'App/Models'

export default class FollowsController {
  public async index({ request, auth }: HttpContextContract) {
    const { username } = request.qs()
    const user = (await User.findBy('username', username)) || auth.user!

    await user.load('followers')
    return user.followers
  }

  public async destroy({ auth, params }: HttpContextContract) {
    // console.log(params)
    const user = auth.user!

    await user.related('followers').detach([params.id])
  }
}
