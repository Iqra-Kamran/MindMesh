// app/dashboard/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return <div>Not authenticated</div>;
  }
  
  return <div className="text-5xl font-bold mb-4">Dashboard content</div>;
}