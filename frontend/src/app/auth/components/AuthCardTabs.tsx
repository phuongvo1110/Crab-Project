import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignIn from "@auth/components/SignIn";
import SignUp from "@auth/components/SignUp";

export default function AuthCardTabs() {
  return (
    <Tabs
      defaultValue="sign-in"
      className="w-[520px] sm:w-full p-2 rounded-lg shadow-sm border border-gray-200"
    >
      <TabsList className="w-full grid grid-cols-2">
        <TabsTrigger
          className="data-[state=active]:bg-foreground data-[state=active]:text-accent rounded-md"
          value="sign-in"
        >
          Sign In
        </TabsTrigger>
        <TabsTrigger
          className="data-[state=active]:bg-foreground data-[state=active]:text-accent rounded-md"
          value="sign-up"
        >
          Sign Up
        </TabsTrigger>
      </TabsList>
      <TabsContent value="sign-in">
        <Card>
          <CardHeader>
            <CardTitle>Log in</CardTitle>
            <CardDescription>
              Enter your account information here, and click Sign In.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignIn />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="sign-up">
        <Card>
          <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>
              Create your account information, we will use this to verify users.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignUp />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
