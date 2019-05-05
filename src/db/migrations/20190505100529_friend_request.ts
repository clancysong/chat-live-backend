import * as Knex from 'knex'

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('friend_request', table => {
  table.increments('id').unique()
  table.integer('requester_id').notNullable()
  table.integer('receiver_id').notNullable()
})}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('friend_request')
}
