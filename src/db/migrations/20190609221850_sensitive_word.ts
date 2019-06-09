import * as Knex from 'knex'

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('sensitive_word', table => {
    table.increments('id').unique()
    table.string('content').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('sensitive_word')
}
