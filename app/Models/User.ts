import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { UserKey, File } from 'App/Models'
import { column, beforeSave, BaseModel, hasMany, HasMany, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public username: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true, serialize:(value:DateTime)=>{
    return value.toFormat('dd/MM/yyyy HH:mm:ss')
  } })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serialize:(value: DateTime)=>{
    return value.toFormat('dd/MM/yyyy HH:mm:ss')
  } })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @hasMany(() => UserKey)
  public keys: HasMany<typeof UserKey>

  @hasOne(() => File, {
    foreignKey: 'ownerId',
    onQuery: (query)=> query.where({fileCategory: 'avatar'})
  })
  public avatar: HasOne<typeof File>
}
