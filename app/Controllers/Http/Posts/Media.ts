import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'
import Database from '@ioc:Adonis/Lucid/Database'
import { StoreValidator } from 'App/Validators/Post/Media'
import { Post } from 'App/Models'
import { cuid } from '@ioc:Adonis/Core/Helpers'

export default class MediaController {
  public async store({ request, auth, response, params }: HttpContextContract) {
    const media = await Database.transaction(async (trx) => {
      const { file } = await request.validate(StoreValidator)
      const post = await Post.findOrFail(params.id)

      if (auth.user!.id !== post.userId) {
        return response.unauthorized()
      }

      post.useTransaction(trx)

      const media = await post.related('media').create({
        fileCategory: 'post',
        fileName: `${cuid()}.${file.extname}`,
      })

      await file.move(Application.tmpPath('uploads'), {
        name: media.fileName,
      })

      return media
    })
    return media
  }

  public async update({}: HttpContextContract) {}
}
