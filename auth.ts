import { SupabaseAdapter } from "@auth/supabase-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  providers: [
    Google({
      clientId: process.env.NEXT_PUBLIC_AUTH_GOOGLE_ID,
      clientSecret: process.env.NEXT_PUBLIC_AUTH_GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
  ],
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    secret: process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY as string,
  }),
  pages: {
    signIn: "/login",
  },
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: { ...session.user, id: token.sub },
    }),
  },
});
