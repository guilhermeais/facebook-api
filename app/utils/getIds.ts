import { OnllineUser } from './OnlineUser'

export const getIds = (onllineUsers: OnllineUser[]) => {
  const ids = onllineUsers.map(({ databaseId }) => databaseId)

  return [...new Set(ids)]
}
