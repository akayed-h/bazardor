"use client";

export default function Error({ reset }) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-20 text-center">
      <div className="text-6xl">⚠️</div>
      <h1 className="mt-4 text-xl font-bold">কিছু একটা সমস্যা হয়েছে</h1>
      <p className="mt-2 text-base-content/70">
        দামের তথ্য আনা যায়নি। একটু পরে আবার চেষ্টা করুন।
      </p>
      <button onClick={() => reset()} className="btn btn-primary mt-6">
        আবার চেষ্টা করুন
      </button>
    </div>
  );
}
