import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="flex h-full w-full flex-col gap-2">
      <Skeleton className="h-1/3 w-full rounded-lg bg-foreground/10" />
      <Skeleton className="h-1/3 w-full rounded-lg bg-foreground/10" />
      <Skeleton className="h-1/3 w-full rounded-lg bg-foreground/10" />
    </div>
  );
}
