import {BaseModel} from '@ioc:Adonis/Lucid/Orm'
import {string} from '@ioc:Adonis/Core/Helpers'

BaseModel.namingStrategy.serializedName = (_model, key) =>{
    return string.camelCase(key)
}