import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function LoginForm() {
  return (
    <>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold">Welcome Back</h2>
        <p className="text-sm text-muted-foreground">
          Please enter your details to log in
        </p>
      </div>

      <form className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="juantamad123" />
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </>
  );
}
