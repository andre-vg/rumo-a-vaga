import { z } from "zod"

import { createTRPCRouter, publicProcedure } from "@/src/server/api/trpc"

export const subjectRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ input, ctx }) => {
    return ctx.db.query.subject.findMany()
  }),
})
