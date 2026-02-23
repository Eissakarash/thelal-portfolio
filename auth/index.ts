import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthConfig } from "next-auth";
import authConfig from "./credentials";

// Only use PrismaAdapter in Node.js environment, not in Edge Runtime
const getAdapter = () => {
  // Check if we're in a Node.js environment
  if (typeof window === "undefined" && process.env.NEXT_RUNTIME !== "edge") {
    return PrismaAdapter(prisma);
  }
  return undefined; // Return undefined for Edge Runtime
};

const authOptions: NextAuthConfig = {
  //!IMPORTANT: strategy for Auth.js
  session: {
    strategy: "jwt",
  },
  debug: true,
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
  // Conditionally use the adapter
  adapter: getAdapter(),
  ...authConfig,
  pages: {
    signIn: "/sign-in",
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
