import * as Knex from 'knex'

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('private_chat', table => {
    table.increments('id').unique()
    table.integer('usera_id').notNullable()
    table.integer('userb_id').notNullable()
    table.string('uuid').notNullable()
  })
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('private_chat')
}
