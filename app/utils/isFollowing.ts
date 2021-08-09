import { User } from 'App/Models'
import { AuthContract } from '@ioc:Adonis/Addons/Auth'

export const isFollowing = async (user: User, auth: AuthContract) => {
  const isFollowing = await user
    .related('followers')
    .query()
    .where('follower_id', auth.user!.id)
    .first()

  user.$extras.isFollowing = isFollowing ? true : false
}
