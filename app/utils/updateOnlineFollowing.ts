import { User } from 'App/Models'
import { getIds } from './getIds'

export const updateOnlineFollowing = async ({ userId, onlineUsers, socket }) => {
  const user = await User.findOrFail(userId)

  await user.preload('followers', (query) => {
    query.whereIn('follower_id', getIds(onlineUsers))
  })

  user.followers.map((user) => {
    const onllineUser = onlineUsers.find(({ databaseId }) => databaseId === user.id)

    if (onllineUser) {
      socket.to(onllineUser.sockeId).emit('updateOnllineFollowing')
    }
  })
}
