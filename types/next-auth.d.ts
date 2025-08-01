import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    name?: string | null;
  }
  
  interface Session {
    user: User & {
      id: string;
    };
  }
}