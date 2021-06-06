import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import { UpdateValidator } from 'App/Validators/User/Avatar'
import { FileCategory } from 'App/utils'
import Application from '@ioc:Adonis/Core/Application'
import fs from 'fs'

export default class UserAvatarController {
  public async update({ request, auth }: HttpContextContract) {
    const response = await Database.transaction(async (trans) => {
      // pegamos o arquivo do request
      const { file } = await request.validate(UpdateValidator)
      // pegamos o usuário autenticado
      const user = auth.user!.useTransaction(trans)
      // criamos o payload que buscar algum avatar relacionado ao usuário (searchPayload)
      // e o que cria esse avatar se ele não existir (savePayload)
      const searchPayload = {}
      const savePayload = {
        fileCategory: 'avatar' as FileCategory,
        fileName: `${new Date().getTime()}.${file.extname}`,
      }

      // armazenamos o avatar relacionado com o usuário que criamos ou encontramos
      const avatar = await user.related('avatar').firstOrCreate(searchPayload, savePayload)

      // agora, vamos armazenar essea avatar aqui na pasta uploads e algumas configurações
      await file.move(Application.tmpPath('uploads'), {
        name: avatar.fileName,
        overwrite: true,
      })

      return avatar
    })
    return response
  }

  public async destroy({ request, auth }: HttpContextContract) {
    const response = await Database.transaction(async (trans) => {
      const user = auth.user!.useTransaction(trans)

      // busca se o usuário autenticado tem avatar
      const avatar = await user
        .related('avatar')
        .query()
        .where({ fileCategory: 'avatar' })
        .firstOrFail()

      // se encontrarmos esse avatar, iremos primeiro apagar ele do banco de dados
      await avatar.delete()

      // e depois vamos excluir o arquivo físico com a ajuda do FS do node
      // vamos passar o caminho do arquivo pelo tmbPath
      await fs.unlinkSync(Application.tmpPath('uploads',  avatar.fileName))
    })
    return response
  }
}
