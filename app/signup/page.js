import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import SignUpForm from "@/components/SignUpForm";

export const metadata = { title: "সাইন আপ" };

export default async function SignUpPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (session) redirect("/");

  return (
    <div className="px-4 py-12">
      <SignUpForm />
    </div>
  );
}
