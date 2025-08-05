// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm"
import { integer, pgSchema } from "drizzle-orm/pg-core";
export const customSchema = pgSchema('custom');
export const users = customSchema.table('users', {
  id: integer()
})