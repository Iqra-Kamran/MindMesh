/*import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          await connectToDatabase();
          const user = await User.findOne({ username: credentials?.username });
          if (!user) throw new Error("No user found");

          const isValid = await bcrypt.compare(
            credentials!.password,
            user.password
          );
          if (!isValid) throw new Error("Invalid password");

          return { id: user._id.toString(), name: user.username };
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET, // Make sure this is set in .env
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};*/

import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          await connectToDatabase();
          const user = await User.findOne({ username: credentials?.username });
          if (!user) throw new Error("No user found");

          const isValid = await bcrypt.compare(
            credentials!.password,
            user.password
          );
          if (!isValid) throw new Error("Invalid password");

          return { 
            id: user._id.toString(), 
            name: user.username,
            email: user.email || null
          };
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  // Remove pages configuration since we're using a modal
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id && session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Redirect to dashboard after successful login
      if (url.includes("/dashboard")) {
        return `${baseUrl}/dashboard`;
      }
      return url.startsWith(baseUrl) ? url : baseUrl;
    }
  },
};