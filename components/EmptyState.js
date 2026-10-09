import Link from "next/link";

export default function EmptyState({
  code = "৪০৪",
  title = "পাতাটি খুঁজে পাওয়া যায়নি",
  message = "আপনি যে পাতাটি খুঁজছেন তা নেই বা সরিয়ে নেওয়া হয়েছে।",
}) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-20 text-center">
      <div className="text-6xl">🛒</div>
      <p className="mt-4 text-5xl font-extrabold text-primary">{code}</p>
      <h1 className="mt-3 text-xl font-bold">{title}</h1>
      <p className="mt-2 text-base-content/70">{message}</p>
      <Link href="/" className="btn btn-primary mt-6">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
