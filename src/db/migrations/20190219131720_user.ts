import Knex from 'knex'

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('user', table => {
    table.increments('id')
    table.string('email').notNullable().unique()
    table.string('name').notNullable()
    table.binary('avatar')
    table.string('password').notNullable()
    table.enum('status', ['online', 'offline']).defaultTo('offline')
  })
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('user')
}
