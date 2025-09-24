import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignupForm from "@/components/forms/signup-form";
import LoginForm from "@/components/forms/login-form";
import { useSearchParams } from "react-router-dom";

export default function AuthPage() {
  const [searchParams] = useSearchParams();

  return (
    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 bg-accent-foreground">
      <div className="flex flex-col items-center justify-between h-full md:px-10 px-8 py-6 rounded-t-2xl md:rounded-none bg-background order-1 md:order-0">
        <a className="logo text-xl font-bold hidden md:block">Logo</a>

        <Tabs
          defaultValue={searchParams.get("tab") || "login"}
          className="w-full max-w-md"
        >
          <TabsList className="w-full grid grid-cols-2 gap-1 mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger
              onClick={() => handleChangeTab("register")}
              value="register"
            >
              Register
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <LoginForm />
          </TabsContent>

          <TabsContent value="register">
            <SignupForm />
          </TabsContent>
        </Tabs>

        <footer className="text-xs text-muted-foreground text-center mt-8">
          © {new Date().getFullYear()} My logo. All rights reserved.
        </footer>
      </div>

      <div className="flex justify-center items-center py-10 px-6 bg-primary">
        <p className="text-lg font-medium text-background">
          Welcome to our platform
        </p>
      </div>
    </div>
  );
}
