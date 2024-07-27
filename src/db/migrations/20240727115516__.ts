import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("blogs", (table: Knex.CreateTableBuilder) => {
    table.uuid("id").defaultTo(knex.fn.uuid()).primary();
    table.string("title").notNullable();
    table.text("content").notNullable();
    table.boolean("isPublished").defaultTo(false);
    table
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("blogs");
}
