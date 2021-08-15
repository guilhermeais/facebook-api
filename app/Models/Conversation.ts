import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { User, Message } from '.'

export default class Conversation extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userIdOne: number

  @column()
  public userIdTwo: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User, { foreignKey: 'id' })
  public userOne: BelongsTo<typeof User>

  @belongsTo(() => User, { foreignKey: 'id' })
  public userTwo: BelongsTo<typeof User>

  @hasMany(() => Message)
  public messages: HasMany<typeof Message>
}
