import { z } from "zod";
import { eq, and, sql } from "drizzle-orm";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { subject, taUserSubject } from "@/server/db/schema";

export const subjectRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const userSubjects = await ctx.db
      .select({
        id: subject.id,
        name: subject.name,
        createdAt: subject.createdAt,
      })
      .from(subject)
      .innerJoin(
        taUserSubject,
        and(
          eq(taUserSubject.subjectId, subject.id),
          eq(taUserSubject.userId, ctx.session.user.id),
        ),
      );

    return userSubjects;
  }),

  create: protectedProcedure
    .input(z.object({ name: z.string().min(1).max(100) }))
    .mutation(async ({ ctx, input }) => {
      // Check if subject already exists
      const existingSubject = await ctx.db
        .select()
        .from(subject)
        .where(eq(subject.name, input.name))
        .limit(1);

      let subjectId: number;

      if (existingSubject.length > 0) {
        subjectId = existingSubject[0]!.id;
        // Check if user already has this subject
        const userHasSubject = await ctx.db
          .select()
          .from(taUserSubject)
          .where(
            and(
              eq(taUserSubject.subjectId, subjectId),
              eq(taUserSubject.userId, ctx.session.user.id),
            ),
          )
          .limit(1);

        if (userHasSubject.length > 0) {
          throw new Error("Você já possui esta matéria");
        }
      } else {
        // Create new subject
        const [newSubject] = await ctx.db
          .insert(subject)
          .values({
            name: input.name,
            createdBy: ctx.session.user.id,
          })
          .returning();
        subjectId = newSubject!.id;
      }

      // Link subject to user
      await ctx.db.insert(taUserSubject).values({
        userId: ctx.session.user.id,
        subjectId,
      });

      return { id: subjectId, name: input.name };
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      // Verify user owns this subject
      const userSubject = await ctx.db
        .select()
        .from(taUserSubject)
        .where(
          and(
            eq(taUserSubject.subjectId, input.id),
            eq(taUserSubject.userId, ctx.session.user.id),
          ),
        )
        .limit(1);

      if (userSubject.length === 0) {
        throw new Error("Matéria não encontrada");
      }

      // Remove association
      await ctx.db
        .delete(taUserSubject)
        .where(
          and(
            eq(taUserSubject.subjectId, input.id),
            eq(taUserSubject.userId, ctx.session.user.id),
          ),
        );

      return { success: true };
    }),
});
