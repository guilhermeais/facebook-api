import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { User } from 'App/Models'
import { UserKey } from 'App/Models'
import { StoreValidator, UpdateValidator } from 'App/Validators/User/Register'
import faker from 'faker'
import Mail from '@ioc:Adonis/Addons/Mail'
import Database from '@ioc:Adonis/Lucid/Database'

export default class UserRegisterController {
  public async store({ request }: HttpContextContract) {
    await Database.transaction(async (trx) => {
      const { email, redirectUrl } = await request.validate(StoreValidator)

      const user = new User() // Aqui, vamos apenas instanciar o model User, e não criar direto
      user.useTransaction(trx) // vamos usar a transaction criada
      user.email = email // vamos colocar o email do request.body no usuário

      await user.save()

      const key = faker.datatype.uuid() + user.id

      user.related('keys').create({ key }) // como o usuário já está relacionado com a key, a gente cria a key buscando o relaiconamento com o usúario

      const link = `${redirectUrl.replace(/\/$/, '')}/${key}`
      console.log(redirectUrl)
      console.log(link)
      await Mail.send((message) => {
        message.to(email) // já dizemos que o email será enviado para o email que o usuário colocou
        message.from('contato@facebook.com', 'Facebook')
        message.subject('Criação de conta')
        message.htmlView('emails/verify-email', { link }) // aqui, passamos o caminho da view e dados para ela
      })
    })
  }

  public async show({ params }: HttpContextContract) {
    const userKey = await UserKey.findByOrFail('key', params.key)
    await userKey.load('user')

    return userKey.user.serialize({
      fields: {
        omit: ['rememberMeToken'],
      },
    })
  }

  public async update({ request, response }: HttpContextContract) {
    const { name, password, key } = await request.validate(UpdateValidator)

    const userKey = await UserKey.findByOrFail('key', key)
    const user = await userKey.related('user').query().firstOrFail()

    const username = name.split(' ')[0].toLowerCase() + user.id

    user.merge({ name, password, username })

    await user.save()

    await userKey.delete()

    return response.ok({ message: 'Ok' })
  }
}
