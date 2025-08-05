import {
  integer,
  pgSchema,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const rumoAVaga = pgSchema("rumo_a_vaga")

export const subject = rumoAVaga.table("subject", {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  name: varchar({ length: 256 }).notNull(),
  createdAt: timestamp({ withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  createdBy: text().notNull(),
  image: text().notNull(),
})

export const study = rumoAVaga.table("study", {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  createdAt: timestamp({ withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  subjectId: integer()
    .notNull()
    .references(() => subject.id),
  date: timestamp({ withTimezone: true }).notNull(),
  period: text().notNull(),
  method: text().notNull(),
  questions: integer(),
  correctQuestions: integer(),
  topic: text(),
  timeSpent: integer().notNull(),
  pauseTime: integer().notNull(),
})
