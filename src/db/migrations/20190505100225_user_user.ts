import Knex from 'knex'

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('user_user', table => {
    table.increments('id').unique()
    table.integer('usera_id').notNullable()
    table.integer('userb_id').notNullable()
  })
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('user_user')
}
