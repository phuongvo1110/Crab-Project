import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLoading from "@/app/(protected)/dashboard/Components/DashboardLoading";

export default function DataCard({
  title,
  data,
  previousData,
  icon,
  isLoading,
}: {
  title: string;
  data: string;
  previousData: string;
  icon: React.ReactNode;
  isLoading?: boolean;
}) {
  return (
    <>
      {isLoading ? (
        <Card className="h-32 w-full p-2">
          <DashboardLoading />
        </Card>
      ) : (
        <Card className="h-32 w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            {icon}
          </CardHeader>
          <CardContent className="sm:px-6">
            <div className="line-clamp-1 overflow-ellipsis text-xl font-bold">
              {data}
            </div>
            <p className="text-muted-foreground line-clamp-2 overflow-ellipsis text-xs">
              {previousData}
            </p>
          </CardContent>
        </Card>
      )}
    </>
  );
}
