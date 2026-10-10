import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import SignInForm from "@/components/SignInForm";

export const metadata = { title: "সাইন ইন" };

// Only allow same-site relative paths to prevent open redirects.
function safePath(p) {
  return typeof p === "string" && p.startsWith("/") && !p.startsWith("//") ? p : "/";
}

export default async function SignInPage({ searchParams }) {
  const sp = await searchParams;
  const redirectTo = safePath(sp?.redirect);

  const session = await auth.api.getSession({ headers: await headers() });
  if (session) redirect(redirectTo);

  return (
    <div className="px-4 py-12">
      <SignInForm redirectTo={redirectTo} protectedRedirect={sp?.reason === "protected"} />
    </div>
  );
}
