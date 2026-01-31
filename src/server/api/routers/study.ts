import { z } from "zod";
import { eq, and, desc, sql, gte, lte } from "drizzle-orm";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { study, subject } from "@/server/db/schema";

export const studyRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(50),
        offset: z.number().min(0).default(0),
      }),
    )
    .query(async ({ ctx, input }) => {
      const studies = await ctx.db
        .select({
          id: study.id,
          subjectId: study.subjectId,
          subjectName: subject.name,
          date: study.date,
          period: study.period,
          method: study.method,
          questions: study.questions,
          correctQuestions: study.correctQuestions,
          topic: study.topic,
          minutes: study.minutes,
          pauseMinutes: study.pauseMinutes,
          createdAt: study.createdAt,
        })
        .from(study)
        .innerJoin(subject, eq(study.subjectId, subject.id))
        .where(eq(study.userId, ctx.session.user.id))
        .orderBy(desc(study.createdAt))
        .limit(input.limit)
        .offset(input.offset);

      return studies;
    }),

  getById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const [studyData] = await ctx.db
        .select({
          id: study.id,
          subjectId: study.subjectId,
          subjectName: subject.name,
          date: study.date,
          period: study.period,
          method: study.method,
          questions: study.questions,
          correctQuestions: study.correctQuestions,
          topic: study.topic,
          minutes: study.minutes,
          pauseMinutes: study.pauseMinutes,
          createdAt: study.createdAt,
        })
        .from(study)
        .innerJoin(subject, eq(study.subjectId, subject.id))
        .where(
          and(eq(study.id, input.id), eq(study.userId, ctx.session.user.id)),
        )
        .limit(1);

      if (!studyData) {
        throw new Error("Estudo não encontrado");
      }

      return studyData;
    }),

  create: protectedProcedure
    .input(
      z.object({
        subjectId: z.number(),
        date: z.string().optional(),
        period: z.string().optional(),
        method: z.string().optional(),
        questions: z.number().optional(),
        correctQuestions: z.number().optional(),
        topic: z.string().optional(),
        minutes: z.number().min(0),
        pauseMinutes: z.number().min(0).default(0),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const [newStudy] = await ctx.db
        .insert(study)
        .values({
          subjectId: input.subjectId,
          userId: ctx.session.user.id,
          date: input.date
            ? new Date(input.date).toISOString().split("T")[0]
            : null,
          period: input.period ?? null,
          method: input.method ?? null,
          questions: input.questions ?? null,
          correctQuestions: input.correctQuestions ?? null,
          topic: input.topic ?? null,
          minutes: input.minutes,
          pauseMinutes: input.pauseMinutes,
        })
        .returning();

      return newStudy;
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        subjectId: z.number().optional(),
        date: z.string().optional(),
        period: z.string().optional(),
        method: z.string().optional(),
        questions: z.number().optional(),
        correctQuestions: z.number().optional(),
        topic: z.string().optional(),
        minutes: z.number().min(0).optional(),
        pauseMinutes: z.number().min(0).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...updateData } = input;

      const [updatedStudy] = await ctx.db
        .update(study)
        .set({
          ...updateData,
          date: updateData.date
            ? new Date(updateData.date).toISOString().split("T")[0]
            : undefined,
        })
        .where(and(eq(study.id, id), eq(study.userId, ctx.session.user.id)))
        .returning();

      if (!updatedStudy) {
        throw new Error("Estudo não encontrado");
      }

      return updatedStudy;
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const [deletedStudy] = await ctx.db
        .delete(study)
        .where(
          and(eq(study.id, input.id), eq(study.userId, ctx.session.user.id)),
        )
        .returning();

      if (!deletedStudy) {
        throw new Error("Estudo não encontrado");
      }

      return { success: true };
    }),

  getStats: protectedProcedure.query(async ({ ctx }) => {
    // Total studies
    const [totalStudiesResult] = await ctx.db
      .select({ count: sql<number>`count(*)` })
      .from(study)
      .where(eq(study.userId, ctx.session.user.id));

    // Total minutes
    const [totalMinutesResult] = await ctx.db
      .select({ total: sql<number>`COALESCE(sum(minutes), 0)` })
      .from(study)
      .where(eq(study.userId, ctx.session.user.id));

    // Total questions
    const [totalQuestionsResult] = await ctx.db
      .select({ total: sql<number>`COALESCE(sum(questions), 0)` })
      .from(study)
      .where(eq(study.userId, ctx.session.user.id));

    // Correct questions
    const [correctQuestionsResult] = await ctx.db
      .select({ total: sql<number>`COALESCE(sum(0), 0)` })
      .from(study)
      .where(eq(study.userId, ctx.session.user.id));

    // Studies by subject
    const studiesBySubject = await ctx.db
      .select({
        subjectId: study.subjectId,
        subjectName: subject.name,
        count: sql<number>`count(*)`,
        totalMinutes: sql<number>`COALESCE(sum(minutes), 0)`,
      })
      .from(study)
      .innerJoin(subject, eq(study.subjectId, subject.id))
      .where(eq(study.userId, ctx.session.user.id))
      .groupBy(study.subjectId, subject.name);

    // Today's studies
    const today = new Date().toISOString().split("T")[0]!;
    const [todayStudiesResult] = await ctx.db
      .select({
        count: sql<number>`count(*)`,
        minutes: sql<number>`COALESCE(sum(minutes), 0)`,
      })
      .from(study)
      .where(
        and(
          eq(study.userId, ctx.session.user.id),
          sql`${study.date} >= ${today}`,
          sql`${study.date} <= ${today}`,
        ),
      );

    // Weekly studies (last 7 days)
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0]!;
    const [weeklyStudiesResult] = await ctx.db
      .select({
        count: sql<number>`count(*)`,
        minutes: sql<number>`COALESCE(sum(minutes), 0)`,
      })
      .from(study)
      .where(
        and(
          eq(study.userId, ctx.session.user.id),
          sql`${study.date} >= ${weekAgo}`,
        ),
      );

    // Monthly studies (last 30 days)
    const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0]!;
    const [monthlyStudiesResult] = await ctx.db
      .select({
        count: sql<number>`count(*)`,
        minutes: sql<number>`COALESCE(sum(minutes), 0)`,
      })
      .from(study)
      .where(
        and(
          eq(study.userId, ctx.session.user.id),
          sql`${study.date} >= ${monthAgo}`,
        ),
      );

    return {
      totalStudies: Number(totalStudiesResult?.count ?? 0),
      totalMinutes: Number(totalMinutesResult?.total ?? 0),
      totalQuestions: Number(totalQuestionsResult?.total ?? 0),
      correctQuestions: Number(correctQuestionsResult?.total ?? 0),
      accuracy:
        Number(totalQuestionsResult?.total ?? 0) > 0
          ? Math.round(
              (Number(correctQuestionsResult?.total ?? 0) /
                Number(totalQuestionsResult?.total ?? 0)) *
                100,
            )
          : 0,
      todayStudies: Number(todayStudiesResult?.count ?? 0),
      todayMinutes: Number(todayStudiesResult?.minutes ?? 0),
      weeklyStudies: Number(weeklyStudiesResult?.count ?? 0),
      weeklyMinutes: Number(weeklyStudiesResult?.minutes ?? 0),
      monthlyStudies: Number(monthlyStudiesResult?.count ?? 0),
      monthlyMinutes: Number(monthlyStudiesResult?.minutes ?? 0),
      studiesBySubject,
    };
  }),
});
