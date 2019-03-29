import * as Knex from 'knex'

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('message', table => {
  table.increments('id').notNullable().unique()
  table.integer('creator_id').notNullable()
  table.integer('group_id').notNullable()
  table.timestamp('created_at').defaultTo(knex.fn.now())
  table.string('content').notNullable()
})}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('message')
}
