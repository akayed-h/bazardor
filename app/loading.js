import { GridSkeleton, SectionHeadingSkeleton } from "@/components/Skeletons";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <SectionHeadingSkeleton />
      <GridSkeleton count={8} />
    </div>
  );
}
