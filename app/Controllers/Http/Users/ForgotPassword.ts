import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { User } from 'App/Models'
import { UserKey } from 'App/Models'
import { StoreValidator, UpdateValidator } from 'App/Validators/User/ForgotPassword'
import faker from 'faker'
import Mail from '@ioc:Adonis/Addons/Mail'
import Database from '@ioc:Adonis/Lucid/Database'

export default class UserForgotPasswordController {
  public async store({ request }: HttpContextContract) {
    await Database.transaction(async (trx) => {
      const { email, redirectUrl } = await request.validate(StoreValidator)

      const user = await User.findByOrFail('email', email)
      user.useTransaction(trx)

      const key = faker.datatype.uuid() + user.id

      user.merge({ rememberMeToken: key })
      await user.save()

      user.related('keys').create({ key })

      const link = `${redirectUrl.replace(/\/$/, '')}/${key}`
      console.log(redirectUrl)
      console.log(link)
      await Mail.send((message) => {
        message.to(email)
        message.from('contato@facebook.com', 'Facebook')
        message.subject('Recuperação de senha')
        message.htmlView('emails/forgot-password-email', { link })
      })
    })
  }

  public async show({ params }: HttpContextContract) {
    const userKey = await UserKey.findByOrFail('key', params.key)
    await userKey.load('user')

    return userKey.user
  }

  public async update({ request, response }: HttpContextContract) {
    const { password, key } = await request.validate(UpdateValidator)

    const userKey = await UserKey.findByOrFail('key', key)
    const user = await userKey.related('user').query().firstOrFail()

    user.merge({ password })

    await user.save()

    await userKey.delete()

    return response.ok({ message: 'Ok' })
  }
}
