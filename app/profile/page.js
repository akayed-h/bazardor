import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export const metadata = { title: "আমার প্রোফাইল" };

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin?redirect=/profile&reason=protected");

  const { user } = session;

  return (
    <div className="px-4 py-12">
      <div className="mx-auto max-w-md rounded-box border border-base-300 bg-white p-6 text-center sm:p-8">
        {user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.image}
            alt=""
            className="mx-auto h-24 w-24 rounded-full object-cover"
          />
        ) : (
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary text-4xl font-bold text-primary-content">
            {(user.name || user.email).charAt(0).toUpperCase()}
          </div>
        )}
        <h1 className="mt-4 text-2xl font-extrabold">{user.name}</h1>
        <p className="text-base-content/60">{user.email}</p>

        <Link href="/profile/update" className="btn btn-primary mt-6">
          তথ্য আপডেট করুন
        </Link>
      </div>
    </div>
  );
}
