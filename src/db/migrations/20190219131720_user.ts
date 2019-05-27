import Knex from 'knex'

/*
* Permission Level
* 1 - Common User
* 2 - Community Manager
* 3 - System Manager
*/

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('user', table => {
    table.increments('id').unique()
    table.string('email').notNullable()
    table.string('name').notNullable()
    table.string('avatar')
    table.string('password').notNullable()
    table.enum('status', ['online', 'offline']).defaultTo('offline')
    table.integer('permission_level').defaultTo(1)
  })
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('user')
}
