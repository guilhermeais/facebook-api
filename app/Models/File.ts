import { BaseModel, column, computed } from '@ioc:Adonis/Lucid/Orm'
import {FileCategory} from 'App/utils'
import Env from '@ioc:Adonis/Core/Env'

export default class File extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  public id: number

  @column({serializeAs: null})
  public fileCategory: FileCategory

  @column({serializeAs: null})
  public ownerId: number

  @column({serializeAs: null})
  public fileName: string

  @computed()
  public get url():string {
    return `${Env.get('APP_URL')}/uploads/${this.fileName}`
  }
}
