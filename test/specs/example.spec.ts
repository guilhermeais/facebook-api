import test from 'japa'
import { request } from 'Test/utils'
import { UserFactory } from 'Database/factories'
import Database from '@ioc:Adonis/Lucid/Database'

test.group('Example', (group) => {
  // group.beforeEach(async () => {
  //   await Database.beginGlobalTransaction()
  // })

  // group.afterEach(async () => {
  //   await Database.rollbackGlobalTransaction()
  // })

  test('ensure the login works', async (assert) => {
    const user = await UserFactory.merge({ password: 'secret' }).with('posts', 5).create()

    const { body, status } = await request.post('/auth').send({
      email: user.email,
      password: 'secret',
    })

    assert.exists(body.token)
    assert.equal(status, 200)
  })
})
