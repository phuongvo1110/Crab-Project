import { Card, CardHeader, CardContent } from "@components/ui/card";
import CreateForm from "./Components/CreateForm";
import GoogleMap from "@/app/(main)/customer/Components/GoogleMap";

export default async function page() {
  return (
    <div className="flex h-full min-h-[calc(100vh_-_6rem)] flex-col gap-2 px-4 pb-4 sm:px-2 sm:pb-2">
      <h1 className="my-2 text-2xl font-medium">
        Create trip for phone customer
      </h1>
      <div className="grid h-full w-full grid-cols-2 gap-4 lg:grid-cols-1 sm:gap-2">
        <Card>
          <CardHeader className="pb-3">Enter trip information</CardHeader>
          <CardContent>
            <CreateForm />
          </CardContent>
        </Card>
        <Card className="h-[600px] sm:h-[550px]">
          <CardHeader className="pb-3">Map</CardHeader>
          <CardContent className="mt-2 p-6 lg:mt-0">
            <div className="h-60 w-full">
              <GoogleMap isSearch={true} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
