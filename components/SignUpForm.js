"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "./SocialButtons";

export default function SignUpForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function fail(msg) {
    setError(msg);
    toast.error(msg);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");

    if (!name || !email || !password) return fail("সবগুলো ঘর পূরণ করুন");
    if (password.length < 8) return fail("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");

    setLoading(true);
    const { error } = await authClient.signUp.email({ name, email, password });
    setLoading(false);

    if (error) return fail(error.message || "সাইন আপ করা যায়নি");

    toast.success("অ্যাকাউন্ট তৈরি হয়েছে! এবার সাইন ইন করুন");
    router.push("/signin");
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-box border border-base-300 bg-white p-6 sm:p-8">
      <h1 className="text-2xl font-extrabold">নতুন অ্যাকাউন্ট খুলুন</h1>
      <p className="mt-1 text-sm text-base-content/60">কয়েক সেকেন্ডেই রেজিস্ট্রেশন সম্পন্ন করুন</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
        <label className="form-control block">
          <span className="mb-1 block text-sm font-medium">নাম</span>
          <input
            name="name"
            type="text"
            autoComplete="name"
            placeholder="আপনার নাম"
            className="input input-bordered w-full"
          />
        </label>
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
            autoComplete="new-password"
            placeholder="কমপক্ষে ৮ অক্ষর"
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
          সাইন আপ
        </button>
      </form>

      <div className="divider my-6 text-xs text-base-content/50">অথবা</div>
      <SocialButtons callbackURL="/" />

      <p className="mt-6 text-center text-sm">
        আগে থেকেই অ্যাকাউন্ট আছে?{" "}
        <Link href="/signin" className="font-semibold text-primary hover:underline">
          সাইন ইন করুন
        </Link>
      </p>
    </div>
  );
}
