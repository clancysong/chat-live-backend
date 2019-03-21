import Knex from 'knex'

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('user', table => {
    table.increments('id')
    table.string('email').notNullable().unique()
    table.string('name').notNullable()
    table.string('password').notNullable()
    table.boolean('online').defaultTo(false)
    table.specificType('friends', 'integer[]').defaultTo('{}')
    table.specificType('friend_requests', 'integer[]').defaultTo('{}')
  })
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('user')
}
