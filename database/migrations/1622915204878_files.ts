import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import {fileCategories} from 'App/utils'

export default class Files extends BaseSchema {
  protected tableName = 'files'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.enu('file_category', fileCategories).notNullable()
      table.integer('owner_id').notNullable()
      table.string('file_name').notNullable()
     
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
