import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-base-200 to-base-100">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 md:grid-cols-2 md:py-16">
        <div className="text-center md:text-left">
          <p className="text-sm font-semibold tracking-wide text-primary">
            প্রতিদিনের বাজার দর
          </p>
          <h1 className="mt-2 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
            আজকের বাজারদর, <span className="text-primary">এক নজরে</span>
          </h1>
          <p className="mt-4 text-base text-base-content/70 sm:text-lg">
            চাল, ডাল, তেল, সবজি, মাছ-মাংসসহ নিত্যপ্রয়োজনীয় পণ্যের সর্বশেষ দাম এবং
            দাম বাড়া-কমার খবর জানুন সারা দেশের বাজার থেকে।
          </p>
          <a href="#সব-পণ্য" className="btn btn-primary btn-md mt-6 sm:btn-lg">
            সব পণ্যের দাম দেখুন ↓
          </a>
        </div>

        <div className="flex justify-center">
          <Image
            src="/hero.png"
            alt="ফল ও সবজির ঝুড়ি"
            width={320}
            height={270}
            priority
            className="h-auto w-64 sm:w-80 md:w-full md:max-w-md"
          />
        </div>
      </div>
    </section>
  );
}
