import { redirect } from "next/navigation";
import { isLoggedIn } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function ProtectedLayout({ children }) {
  if (!(await isLoggedIn())) redirect("/admin/login");
  return <div className="admin-shell">{children}</div>;
}
