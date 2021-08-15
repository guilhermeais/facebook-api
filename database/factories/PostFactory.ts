import { Post } from 'App/Models'
import Factory from '@ioc:Adonis/Lucid/Factory'

export const PostFactory = Factory.define(Post, ({ faker }) => {
  return {
    description: faker.lorem.text(),
  }
}).build()
