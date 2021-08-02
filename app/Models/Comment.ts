import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Post from './Post'
import User from './User'

export default class Comment extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public content: string

  @column({ serializeAs: null })
  public userId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column({ serializeAs: null })
  public postId: number

  @belongsTo(() => Post)
  public post: BelongsTo<typeof Post>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
