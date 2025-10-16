import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignupForm from "@/components/forms/signup-form";
import LoginForm from "@/components/forms/login-form";
import AuthHero from "@/components/auth/auth-hero";
import { useSearchParams } from "react-router-dom";

export default function AuthPage() {
  const [searchParams] = useSearchParams();

  return (
    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 min-h-screen">
      {/* Left Side - Auth Forms */}
      <div className="flex flex-col items-center justify-between h-full px-8 py-6 bg-background order-2 md:order-1">
        <div className="text-center">
          <a className="logo text-xl font-bold">Projet</a>
          <span className="text-xs text-muted-foreground tracking-widest mt-1 block">
            work. flow. evolve.
          </span>
        </div>

        <Tabs
          defaultValue={searchParams.get("tab") || "login"}
          className="w-full max-w-md"
        >
          <TabsList className="w-full grid grid-cols-2 gap-1 mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <LoginForm />
          </TabsContent>

          <TabsContent value="register">
            <SignupForm />
          </TabsContent>
        </Tabs>

        <footer className="text-xs text-muted-foreground text-center mt-8">
          © {new Date().getFullYear()} Projet. All rights reserved.
        </footer>
      </div>

      {/* Right Side - Hero Section (Hidden on mobile only) */}
      <div className="hidden md:block bg-gradient-to-br from-primary to-primary/90 order-1 md:order-2">
        <AuthHero />
      </div>
    </div>
  );
}
