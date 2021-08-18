import Factory from '@ioc:Adonis/Lucid/Factory'
import { File } from 'App/Models'

export const PostMediaFactory = Factory.define(File, ({ faker }) => {
  return {
    fileCategory: 'post' as const,
    fileName: `${faker.datatype.uuid()}.png`,
  }
}).build()
