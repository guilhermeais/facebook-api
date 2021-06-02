import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { User } from 'App/Models'
import { StoreValidator } from 'App/Validators/User/Register'
import faker from 'faker'
import Mail from '@ioc:Adonis/Addons/Mail'

export default class UserRegisterController {
  public async store({request}: HttpContextContract) {
    const {email, redirectUrl} = await request.validate(StoreValidator)

    const user = await User.create({email})
    await user.save()

    const key = faker.datatype.uuid() + user.id

    user.related('keys').create({key})

    const link  = `${redirectUrl.replace(/\/$/, '')}/${key}`

    await Mail.send((message)=>{
      message.to(email) // já dizemos que o email será enviado para o email que o usuário colocou
      message.from('contato@facebook.com', 'Facebook')
      message.subject('Criação de conta')
      message.htmlView('emails/verify-email', {link}) // aqui, passamos o caminho da view e dados para ela
    })
  }

  public async show({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}
}
