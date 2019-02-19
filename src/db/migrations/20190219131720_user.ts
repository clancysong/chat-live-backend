import Knex from 'knex'

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('user', table => {
    table.increments('id')
    table.string('name').notNullable().unique()
    table.string('password').notNullable()
  })
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('user')
}
