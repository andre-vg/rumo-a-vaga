CREATE SCHEMA "drizzle";
--> statement-breakpoint
CREATE TABLE "drizzle"."__drizzle_migrations" (
	"id" serial PRIMARY KEY NOT NULL,
	"hash" text NOT NULL,
	"created_at" bigint
);
--> statement-breakpoint
CREATE TABLE "study" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "study_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"subjectId" integer NOT NULL,
	"date" date,
	"period" text,
	"method" text,
	"questions" integer,
	"correctQuestions" integer,
	"topic" text,
	"userId" text NOT NULL,
	"minutes" integer,
	"pauseMinutes" integer
);
--> statement-breakpoint
CREATE TABLE "subject" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "subject_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by" text
);
--> statement-breakpoint
CREATE TABLE "ta_user_subject" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "ta_user_subject_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"userId" text NOT NULL,
	"subjectId" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "session" DROP CONSTRAINT "session_token_unique";--> statement-breakpoint
ALTER TABLE "user" DROP CONSTRAINT "user_email_unique";--> statement-breakpoint
ALTER TABLE "account" DROP CONSTRAINT "account_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "pg-drizzle_post" DROP CONSTRAINT "pg-drizzle_post_createdById_user_id_fk";
--> statement-breakpoint
ALTER TABLE "session" DROP CONSTRAINT "session_user_id_user_id_fk";
--> statement-breakpoint
CREATE UNIQUE INDEX "__drizzle_migrations_pkey" ON "drizzle"."__drizzle_migrations" USING btree ("id");--> statement-breakpoint
CREATE UNIQUE INDEX "study_pkey" ON "study" USING btree ("id");--> statement-breakpoint
CREATE UNIQUE INDEX "subject_name_key" ON "subject" USING btree ("name");--> statement-breakpoint
CREATE UNIQUE INDEX "subject_pkey" ON "subject" USING btree ("id");--> statement-breakpoint
CREATE UNIQUE INDEX "ta_user_subject_pkey" ON "ta_user_subject" USING btree ("id");--> statement-breakpoint
CREATE UNIQUE INDEX "account_pkey" ON "account" USING btree ("id");--> statement-breakpoint
CREATE UNIQUE INDEX "pg-drizzle_post_pkey" ON "pg-drizzle_post" USING btree ("id");--> statement-breakpoint
CREATE UNIQUE INDEX "session_pkey" ON "session" USING btree ("id");--> statement-breakpoint
CREATE UNIQUE INDEX "session_token_unique" ON "session" USING btree ("token");--> statement-breakpoint
CREATE UNIQUE INDEX "user_email_unique" ON "user" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX "user_pkey" ON "user" USING btree ("id");--> statement-breakpoint
CREATE UNIQUE INDEX "verification_pkey" ON "verification" USING btree ("id");