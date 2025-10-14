import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useFormData } from "@/hooks/use-formdata";
import { useFetch } from "@/hooks/use-fetch";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import DotLoading from "../loadings/dot-loading";

export default function SignupForm() {
  const navigate = useNavigate();
  const {
    error,
    loading,
    refetch: signup,
  } = useFetch("/signup", { method: "POST" }, false);
  const { values, handleChange, getFormData } = useFormData({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = getFormData();

      const result = await signup({ body: formData });


      if (result?.success && !result.error) {
        toast.success(result.message);
        navigate("/auth");


        return;
      }

      if (result?.error) {
        toast.warning(result?.error, {
          closeButton: true,
        });
      }
    } catch (err) {
      console.error("Login failed:", err);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };
  return (
    <>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold">Create an Account</h2>
        <p className="text-sm text-muted-foreground">
          Sign up to get started with us
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col">
          <Label htmlFor="name" className="mb-2">
            Full name
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            value={values.name}
            onChange={handleChange}
            placeholder="Juan Matigasin"
          />
          {error?.name && (
            <span className="text-red-500 text-xs md:text-sm mt-1">
              {error?.name}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <Label htmlFor="email" className="mb-2">
            Email
          </Label>
          <Input
            name="email"
            id="email"
            type="text"
            value={values.email}
            onChange={handleChange}
            placeholder="you@example.com"
          />
          {error?.email && (
            <span className="text-red-500 text-xs md:text-sm mt-1">
              {error?.email}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <Label htmlFor="password" className="mb-2">
            Password
          </Label>
          <Input
            name="password"
            id="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            placeholder="juantamad123"
          />
          {error?.password && (
            <span className="text-red-500 text-xs md:text-sm mt-1">
              {error?.password}
            </span>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? <DotLoading /> : "Create account"}
        </Button>
      </form>
    </>
  );
}
