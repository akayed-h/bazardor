"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfileForm({ initialName }) {
  const router = useRouter();
  const [name, setName] = useState(initialName || "");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      toast.error("নাম খালি রাখা যাবে না");
      return;
    }

    setLoading(true);
    const { error } = await authClient.updateUser({ name: trimmed });
    setLoading(false);

    if (error) {
      toast.error(error.message || "তথ্য আপডেট করা যায়নি");
      return;
    }

    toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
    router.push("/profile");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-md rounded-box border border-base-300 bg-white p-6 sm:p-8">
      <h1 className="text-2xl font-extrabold">তথ্য আপডেট করুন</h1>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <label className="block">
          <span className="mb-1 block text-sm font-medium">নাম</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full"
            placeholder="আপনার নাম"
          />
        </label>

        <div className="flex gap-2">
          <Link href="/profile" className="btn btn-ghost flex-1">
            বাতিল
          </Link>
          <button type="submit" className="btn btn-primary flex-1" disabled={loading}>
            {loading && <span className="loading loading-spinner loading-sm" />}
            তথ্য আপডেট করুন
          </button>
        </div>
      </form>
    </div>
  );
}
