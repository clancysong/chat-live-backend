import * as Knex from 'knex'

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('channel', table => {
    table.increments('id').unique()
    table.string('uuid').notNullable()
    table.string('name').notNullable()
    table.integer('creator_id').notNullable()
    table.integer('group_id').notNullable()
  })
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('channel')
}
