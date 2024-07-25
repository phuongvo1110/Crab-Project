import { Skeleton } from "@components/ui/skeleton";

export default function Loading() {
  return (
    <div className="w-screen h-screen p-10 lg:p-6 rounded-xl grid grid-cols-4 gap-3 content-center">
      <Skeleton className="col-span-4 h-[250px] sm:h-[300px] rounded-xl bg-foreground/10" />
      <Skeleton className="col-span-1 h-[100px] sm:h-[60px] rounded-xl bg-foreground/10" />
      <Skeleton className="col-span-3 h-[100px] sm:h-[60px] rounded-xl bg-foreground/10" />
      <Skeleton className="col-span-1 h-[100px] sm:h-[60px] rounded-xl bg-foreground/10" />
      <Skeleton className="col-span-3 h-[100px] sm:h-[60px] rounded-xl bg-foreground/10" />
      <Skeleton className="col-span-4 h-[100px] sm:h-[60px] rounded-xl bg-foreground/10" />
    </div>
  );
}
