import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import { User } from 'App/Models'
import { CherryPick } from '@ioc:Adonis/Lucid/Model'
export default class UserKey extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public key: string

  @column()
  public userId: string

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
  
}
