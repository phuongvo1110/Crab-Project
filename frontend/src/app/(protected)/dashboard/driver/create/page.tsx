import { Card, CardHeader, CardContent } from "@components/ui/card";
import CreateForm from "@app/(protected)/dashboard/driver/create/Components/CreateForm";

export default function page() {
  return (
    <div className="flex h-full min-h-[calc(100vh_-_6rem)] flex-col gap-2 px-4 pb-4 sm:px-2 sm:pb-2">
      <h1 className="my-2 text-2xl font-medium">Create driver account</h1>
      <div className="h-full w-full">
        <Card>
          <CardHeader className="pb-3">Enter driver's information</CardHeader>
          <CardContent>
            <CreateForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
