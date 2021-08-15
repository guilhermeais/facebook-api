import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Messages extends BaseSchema {
  protected tableName = 'messages'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.text('content').notNullable()
      table
        .integer('user_id')
        .references('users.id')
        .unsigned()
        .onUpdate('cascade')
        .onDelete('cascade')
      table
        .integer('conversation_id')
        .references('conversations.id')
        .unsigned()
        .onDelete('cascade')
        .onUpdate('cascade')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
