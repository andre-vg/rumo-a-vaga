import { pgTable, uniqueIndex, text, timestamp, index, integer, varchar, date, boolean, pgSchema, serial, bigint } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

import { relations } from "drizzle-orm/relations";

export const drizzle = pgSchema("drizzle");

export const account = pgTable("account", {
	id: text("id").primaryKey().notNull(),
	accountId: text("account_id").notNull(),
	providerId: text("provider_id").notNull(),
	userId: text("user_id").notNull(),
	accessToken: text("access_token"),
	refreshToken: text("refresh_token"),
	idToken: text("id_token"),
	accessTokenExpiresAt: timestamp("access_token_expires_at", { mode: 'string' }),
	refreshTokenExpiresAt: timestamp("refresh_token_expires_at", { mode: 'string' }),
	scope: text("scope"),
	password: text("password"),
	createdAt: timestamp("created_at", { mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
},
(table) => {
	return {
		pkey: uniqueIndex("account_pkey").on(table.id),
	}
});

export const pgDrizzlePost = pgTable("pg-drizzle_post", {
	id: integer("id").primaryKey().notNull().generatedByDefaultAsIdentity({ name: "pg-drizzle_post_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	name: varchar("name", { length: 256 }),
	createdById: varchar("createdById", { length: 255 }).notNull(),
	createdAt: timestamp("createdAt", { withTimezone: true, mode: 'string' }).notNull(),
	updatedAt: timestamp("updatedAt", { withTimezone: true, mode: 'string' }),
},
(table) => {
	return {
		createdByIdx: index("created_by_idx").on(table.createdById),
		nameIdx: index("name_idx").on(table.name),
		pkey: uniqueIndex("pg-drizzle_post_pkey").on(table.id),
	}
});

export const session = pgTable("session", {
	id: text("id").primaryKey().notNull(),
	expiresAt: timestamp("expires_at", { mode: 'string' }).notNull(),
	token: text("token").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
	ipAddress: text("ip_address"),
	userAgent: text("user_agent"),
	userId: text("user_id").notNull(),
},
(table) => {
	return {
		pkey: uniqueIndex("session_pkey").on(table.id),
		tokenUnique: uniqueIndex("session_token_unique").on(table.token),
	}
});

export const study = pgTable("study", {
	id: integer("id").primaryKey().notNull().generatedAlwaysAsIdentity({ name: "study_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	subjectId: integer("subjectId").notNull(),
	date: date("date"),
	period: text("period"),
	method: text("method"),
	questions: integer("questions"),
	correctQuestions: integer("correctQuestions"),
	topic: text("topic"),
	userId: text("userId").notNull(),
	minutes: integer("minutes"),
	pauseMinutes: integer("pauseMinutes"),
},
(table) => {
	return {
		pkey: uniqueIndex("study_pkey").on(table.id),
	}
});

export const subject = pgTable("subject", {
	id: integer("id").primaryKey().notNull().generatedAlwaysAsIdentity({ name: "subject_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	name: text("name").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	createdBy: text("created_by"),
},
(table) => {
	return {
		nameKey: uniqueIndex("subject_name_key").on(table.name),
		pkey: uniqueIndex("subject_pkey").on(table.id),
	}
});

export const taUserSubject = pgTable("ta_user_subject", {
	id: integer("id").primaryKey().notNull().generatedAlwaysAsIdentity({ name: "ta_user_subject_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	userId: text("userId").notNull(),
	subjectId: integer("subjectId").notNull(),
},
(table) => {
	return {
		pkey: uniqueIndex("ta_user_subject_pkey").on(table.id),
	}
});

export const user = pgTable("user", {
	id: text("id").primaryKey().notNull(),
	name: text("name").notNull(),
	email: text("email").notNull(),
	emailVerified: boolean("email_verified").notNull(),
	image: text("image"),
	createdAt: timestamp("created_at", { mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
},
(table) => {
	return {
		emailUnique: uniqueIndex("user_email_unique").on(table.email),
		pkey: uniqueIndex("user_pkey").on(table.id),
	}
});

export const verification = pgTable("verification", {
	id: text("id").primaryKey().notNull(),
	identifier: text("identifier").notNull(),
	value: text("value").notNull(),
	expiresAt: timestamp("expires_at", { mode: 'string' }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		pkey: uniqueIndex("verification_pkey").on(table.id),
	}
});

export const __drizzleMigrationsInDrizzle = drizzle.table("__drizzle_migrations", {
	id: serial("id").primaryKey().notNull(),
	hash: text("hash").notNull(),
	createdAt: bigint("created_at", { mode: "number" }),
},
(table) => {
	return {
		pkey: uniqueIndex("__drizzle_migrations_pkey").on(table.id),
	}
});export const accountRelations = relations(account, ({one}) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id]
	}),
}));

export const userRelations = relations(user, ({many}) => ({
	accounts: many(account),
	pgDrizzlePosts: many(pgDrizzlePost),
	sessions: many(session),
	studies: many(study),
	subjects: many(subject),
	taUserSubjects: many(taUserSubject),
}));

export const pgDrizzlePostRelations = relations(pgDrizzlePost, ({one}) => ({
	user: one(user, {
		fields: [pgDrizzlePost.createdById],
		references: [user.id]
	}),
}));

export const sessionRelations = relations(session, ({one}) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	}),
}));

export const studyRelations = relations(study, ({one}) => ({
	subject: one(subject, {
		fields: [study.subjectId],
		references: [subject.id]
	}),
	user: one(user, {
		fields: [study.userId],
		references: [user.id]
	}),
}));

export const subjectRelations = relations(subject, ({one, many}) => ({
	studies: many(study),
	user: one(user, {
		fields: [subject.createdBy],
		references: [user.id]
	}),
	taUserSubjects: many(taUserSubject),
}));

export const taUserSubjectRelations = relations(taUserSubject, ({one}) => ({
	user: one(user, {
		fields: [taUserSubject.userId],
		references: [user.id]
	}),
	subject: one(subject, {
		fields: [taUserSubject.subjectId],
		references: [subject.id]
	}),
}));