import * as Knex from 'knex'

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('group', table => {
  table.increments('id').unique()
  table.string('uuid').notNullable()
  table.string('name').notNullable()
  table.integer('creator_id').notNullable()
  table.string('cover')
  table.string('avatar')
  table.enum('type', ['public', 'private']).defaultTo('private')
  table.string('invite_code').notNullable()
})}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('group')
}
