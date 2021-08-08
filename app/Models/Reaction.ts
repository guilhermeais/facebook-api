import { ReactionsTypes } from 'App/utils/reactionsTypes'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Post from './Post'

export default class Reaction extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public type: ReactionsTypes

  @column()
  public userId: number

  @belongsTo(() => User, { serializeAs: null })
  public user: BelongsTo<typeof User>

  @column()
  public postId: number

  @belongsTo(() => Post, { serializeAs: null })
  public post: BelongsTo<typeof Post>
}
