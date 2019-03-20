import * as Knex from 'knex'

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('group', table => {
  table.increments('id').notNullable().unique()
  table.string('name').notNullable()
  table.specificType('members', 'integer[]').defaultTo('{}')
  table.specificType('messages', 'integer[]').defaultTo('{}')
  table.specificType('channels', 'integer[]').defaultTo('{}')
})}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('group')
}
