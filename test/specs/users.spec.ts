import test from 'japa'
import { request } from 'Test/utils'
import { UserFactory } from 'Database/factories'
import Mail from '@ioc:Adonis/Addons/Mail'
import Database from '@ioc:Adonis/Lucid/Database'
import faker from 'faker'

test.group('/users/register', (group) => {
  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()
  })

  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })

  test('[store] - should able to send mail after pre-registration', async (assert) => {
    const email = faker.internet.email()

    Mail.trap((message) => {
      assert.deepEqual(message.to, [{ address: email }])
      assert.deepEqual(message.subject, 'Criação de conta')
      assert.deepEqual(message.from, {
        address: 'contato@facebook.com',
        name: 'Facebook',
      })
    })

    await request
      .post('/users/register')
      .send({ email, redirectUrl: 'https://facebook.com' })
      .expect(200)

    Mail.restore()
  })
})
