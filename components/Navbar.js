"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function Navbar({ categories = [], dateText }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  async function handleSignOut() {
    const { error } = await authClient.signOut();
    if (error) {
      toast.error(error.message || "সাইন আউট করা যায়নি");
      return;
    }
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  }

  const chip = (active) =>
    `whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
      active
        ? "bg-primary text-primary-content"
        : "text-base-content/80 hover:bg-base-200"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-base-300 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex flex-col leading-tight">
          <span className="text-xl font-extrabold text-primary">🛒 বাজার দর</span>
          <span className="text-xs text-base-content/60" suppressHydrationWarning>
            {dateText}
          </span>
        </Link>

        <div className="flex items-center gap-2">
          {isPending ? (
            <div className="skeleton h-8 w-24 rounded-lg" />
          ) : user ? (
            <div className="dropdown dropdown-end">
              <button
                tabIndex={0}
                className="btn btn-ghost btn-sm gap-2 px-2"
                aria-label="প্রোফাইল মেনু"
              >
                {user.image ? (
                  <img
                    src={user.image}
                    alt=""
                    className="h-7 w-7 rounded-full object-cover"
                  />
                ) : (
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-content">
                    {(user.name || user.email || "?").charAt(0).toUpperCase()}
                  </span>
                )}
                <span className="hidden max-w-28 truncate sm:inline">{user.name}</span>
              </button>
              <ul
                tabIndex={0}
                className="menu dropdown-content z-50 mt-2 w-48 rounded-box border border-base-300 bg-white p-2 shadow"
              >
                <li>
                  <Link href="/profile">আমার প্রোফাইল</Link>
                </li>
                <li>
                  <button onClick={handleSignOut}>সাইন আউট</button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link href="/signin" className="btn btn-outline btn-primary btn-sm sm:btn-md">
                সাইন ইন
              </Link>
              <Link href="/signup" className="btn btn-primary btn-sm sm:btn-md">
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      </div>

      <nav className="border-t border-base-300 bg-white" aria-label="ক্যাটেগরি">
        <ul className="scrollbar-none mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2">
          <li>
            <Link href="/" className={chip(pathname === "/")}>
              🏠 সব পণ্য
            </Link>
          </li>
          {categories.map((c) => {
            const href = `/category/${c.slug}`;
            return (
              <li key={c.slug}>
                <Link
                  href={href}
                  className={chip(pathname === href)}
                  aria-current={pathname === href ? "page" : undefined}
                >
                  {c.icon} {c.nameBn}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
