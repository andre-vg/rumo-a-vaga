import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { supabase } from "./utils/supabase/client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      profile(profile) {
        supabase()
          .from("User")
          .upsert({
            name: profile.name,
            email: profile.email,
            image: profile.picture,
          })
          .select();
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
  ],
});
