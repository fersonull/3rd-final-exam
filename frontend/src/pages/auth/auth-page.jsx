import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignupForm from "@/components/forms/signup-form";
import LoginForm from "@/components/forms/login-form";
import AuthHero from "@/components/auth/auth-hero";
import { useSearchParams } from "react-router-dom";

export default function AuthPage() {
  const [searchParams] = useSearchParams();

  return (
    <div className="flex-1 min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left Side - Auth Forms */}
      <div className="flex flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Projet
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              work. flow. evolve.
            </p>
          </div>

          <Tabs
            defaultValue={searchParams.get("tab") || "login"}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="mt-6">
              <LoginForm />
            </TabsContent>

            <TabsContent value="register" className="mt-6">
              <SignupForm />
            </TabsContent>
          </Tabs>

          <footer className="mt-8 text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} Projet. All rights reserved.
          </footer>
        </div>
      </div>

      {/* Right Side - Hero Section */}
      <div className="hidden lg:block relative">
        <AuthHero />
      </div>
    </div>
  );
}
