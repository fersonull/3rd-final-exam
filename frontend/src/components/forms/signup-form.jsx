import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function SignupForm() {
  return (
    <>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold">Create an Account</h2>
        <p className="text-sm text-muted-foreground">
          Sign up to get started with us
        </p>
      </div>

      <form className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Full name</Label>
          <Input id="name" type="text" placeholder="Juan Matigasin" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="juantamad123" />
        </div>
        <Button type="submit" className="w-full">
          Create account
        </Button>
      </form>
    </>
  );
}
