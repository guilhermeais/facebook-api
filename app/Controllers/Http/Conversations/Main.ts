import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Conversation } from 'App/Models'

export default class ConversationsController {
  public async index({ auth }: HttpContextContract) {
    const conversations = await Conversation.query()
      .where({ userIdOne: auth.user!.id })
      .orWhere({ userIdTwo: auth.user!.id })
      .preload('userOne', (query) => {
        query.whereNot('id', auth.user!.id)
        query.preload('avatar')
      })
      .preload('userTwo', (query) => {
        query.whereNot('id', auth.user!.id)
        query.preload('avatar')
      })
    // .preload('messages', (query) => {
    //   query.whereNot('userId', auth.user!.id).orderBy('createdAt', 'desc')
    // })

    const newArray = conversations.map((conversation) => {
      const conversationInJSON = conversation.toJSON()

      conversationInJSON.user = conversation.userOne || conversation.userTwo

      delete conversationInJSON['userOne']
      delete conversationInJSON['userTwo']

      return conversationInJSON
    })

    return newArray
  }

  public async show({ response, auth, params }: HttpContextContract) {
    const conversation = await Conversation.firstOrFail(params.id)

    if (![conversation.userIdOne, conversation.userIdTwo].includes(auth.user!.id)) {
      return response.unauthorized()
    }

    await conversation.load('messages')

    return conversation
  }

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
