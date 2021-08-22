import { UserFactory } from 'Database/factories'
import { request } from './request'

export const generateToken = async () => {
  const user = await UserFactory.merge({ password: 'secret' })
    .with('posts', 3, (post) => post.with('media'))
    .create()

  const { body } = await request.post('/auth').send({ email: user.email, password: 'secret' })

  return { token: body.token, user }
}
