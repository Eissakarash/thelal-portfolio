import NextAuth, { NextAuthConfig } from "next-auth";
import authConfig from "./credentials";

const authOptions: NextAuthConfig = {
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.name = token.name as string;
      session.user.email = token.email as string;

      return session;
    },
  },
  ...authConfig,
  pages: {
    signIn: "/en/sign-in",
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
