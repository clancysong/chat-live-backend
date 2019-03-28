import Knex from 'knex'

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('user_group', table => {
    table.increments('id').unique()
    table.integer('user').notNullable()
    table.integer('group').notNullable()
  })
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('user_group')
}
