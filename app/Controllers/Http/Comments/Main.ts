import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Post } from 'App/Models'
import Comment from 'App/Models/Comment'
import { StoreValidator, UpdateValidator } from 'App/Validators/Comment/Main'

export default class Main {
  public async store({ request, response, auth }: HttpContextContract) {
    const { content, postId } = await request.validate(StoreValidator)
    const post = await Post.findOrFail(postId)

    const comment = await post.related('comments').create({
      content,
      userId: auth.user!.id,
    })

    return response.ok(comment)
  }

  public async update({ request, response, auth, params }: HttpContextContract) {
    const { content } = await request.validate(UpdateValidator)

    const comment = await Comment.findOrFail(params.id)

    if (auth.user!.id !== comment.userId) {
      return response.unauthorized()
    }

    comment.merge({ content })

    await comment.save()

    return response.ok(comment)
  }

  public async destroy({ response, auth, params }: HttpContextContract) {
    const comment = await Comment.findOrFail(params.id)

    if (auth.user!.id !== comment.userId) {
      return response.unauthorized()
    }

    await comment.delete()
  }
}
