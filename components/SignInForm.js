"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "./SocialButtons";

export default function SignInForm({ redirectTo = "/", protectedRedirect = false }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (protectedRedirect) {
      toast.error("এই পাতাটি দেখতে আগে সাইন ইন করুন", { id: "protected-redirect" });
    }
  }, [protectedRedirect]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");

    if (!email || !password) {
      const msg = "ইমেইল ও পাসওয়ার্ড দুটোই দিন";
      setError(msg);
      toast.error(msg);
      return;
    }

    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);

    if (error) {
      const msg = error.message || "সাইন ইন করা যায়নি। ইমেইল ও পাসওয়ার্ড যাচাই করুন";
      setError(msg);
      toast.error(msg);
      return;
    }

    toast.success("সফলভাবে সাইন ইন হয়েছে");
    router.push(redirectTo);
    router.refresh();
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-box border border-base-300 bg-white p-6 sm:p-8">
      <h1 className="text-2xl font-extrabold">সাইন ইন করুন</h1>
      <p className="mt-1 text-sm text-base-content/60">আপনার অ্যাকাউন্টে প্রবেশ করুন</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
        <label className="form-control block">
          <span className="mb-1 block text-sm font-medium">ইমেইল</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className="input input-bordered w-full"
          />
        </label>
        <label className="form-control block">
          <span className="mb-1 block text-sm font-medium">পাসওয়ার্ড</span>
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            className="input input-bordered w-full"
          />
        </label>

        {error && (
          <p role="alert" className="rounded-lg bg-error/10 px-3 py-2 text-sm text-error">
            {error}
          </p>
        )}

        <button type="submit" className="btn btn-primary w-full" disabled={loading}>
          {loading && <span className="loading loading-spinner loading-sm" />}
          সাইন ইন
        </button>
      </form>

      <div className="divider my-6 text-xs text-base-content/50">অথবা</div>
      <SocialButtons callbackURL={redirectTo} />

      <p className="mt-6 text-center text-sm">
        অ্যাকাউন্ট নেই?{" "}
        <Link href="/signup" className="font-semibold text-primary hover:underline">
          সাইন আপ করুন
        </Link>
      </p>
    </div>
  );
}
