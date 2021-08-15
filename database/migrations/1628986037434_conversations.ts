import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Conversations extends BaseSchema {
  protected tableName = 'conversations'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('user_id_one')
        .references('users.id')
        .unsigned()
        .onUpdate('cascade')
        .onDelete('cascade')
      table
        .integer('user_id_two')
        .references('users.id')
        .unsigned()
        .onUpdate('cascade')
        .onDelete('cascade')
      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
