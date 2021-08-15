import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { StoreValidator } from 'App/Validators/Message/Main'
import { Conversation } from 'App/Models'
export default class MessagesController {
  public async store({ request, response, auth }: HttpContextContract) {
    const { content, receiverId } = await request.validate(StoreValidator)

    if (auth.user!.id === receiverId) {
      return response.badRequest({
        error: { message: "sorry, you can't talk to yourself here :/." },
      })
    }

    const exisitingConversation = await Conversation.query()
      .where({
        userIdOne: auth.user!.id,
        userIdTwo: receiverId,
      })
      .orWhere({
        userIdOne: receiverId,
        userIdTwo: auth.user!.id,
      })
      .first()

    if (exisitingConversation) {
      const message = await exisitingConversation
        .related('messages')
        .create({ content, userId: auth.user!.id })

      return message
    }

    const conversation = await Conversation.create({
      userIdOne: auth.user!.id,
      userIdTwo: receiverId,
    })

    const message = conversation.related('messages').create({
      content,
      userId: auth.user!.id,
    })

    return message
  }

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
