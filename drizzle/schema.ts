import { pgTable, pgSchema, integer, varchar, timestamp, text, foreignKey } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const rumoAVaga = pgSchema("rumo_a_vaga");


export const subjectInRumoAvaga = rumoAVaga.table("subject", {
	id: integer().primaryKey().generatedByDefaultAsIdentity({ name: "rumo_a_vaga.subject_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	name: varchar({ length: 256 }).notNull(),
	createdAt: timestamp({ withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdBy: text().notNull(),
	image: text().notNull(),
});

export const studyInRumoAvaga = rumoAVaga.table("study", {
	id: integer().primaryKey().generatedByDefaultAsIdentity({ name: "rumo_a_vaga.study_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	createdAt: timestamp({ withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	subjectId: integer().notNull(),
	date: timestamp({ withTimezone: true, mode: 'string' }).notNull(),
	period: text().notNull(),
	method: text().notNull(),
	questions: integer(),
	correctQuestions: integer(),
	topic: text(),
	timeSpent: integer().notNull(),
	pauseTime: integer().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.subjectId],
			foreignColumns: [subjectInRumoAvaga.id],
			name: "study_subjectId_subject_id_fk"
		}),
]);
