import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignupForm from "@/components/forms/signup-form";
import LoginForm from "@/components/forms/login-form";

export default function AuthPage() {
  return (
    <div className="flex-1 grid grid-cols-2">
      <div className="flex flex-col items-center justify-between h-full px-10 py-6 rounded-t-2xl">
        <a className="logo text-xl font-bold">Logo</a>

        <Tabs defaultValue="login" className="w-full max-w-md">
          <TabsList className="w-full grid grid-cols-2 gap-1 mb-6">
            <TabsTrigger onClick={() => handleChangeTab("login")} value="login">
              Login
            </TabsTrigger>
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
          Welcome to our platform 🎉
        </p>
      </div>
    </div>
  );
}
