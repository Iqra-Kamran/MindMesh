import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth-options";

const handler = NextAuth({...authOptions, pages: undefined});

export { handler as GET, handler as POST };