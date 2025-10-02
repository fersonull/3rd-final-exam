import { useAuthContext } from "@/contexts/auth-context";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFetch } from "@/hooks/useFetch";
import { useFormData } from "@/hooks/useFormData";
import DotLoading from "../loadings/dot-loading";
import { toast } from "sonner";

export default function LoginForm() {
  const navigate = useNavigate();
  const { setUser, setToken } = useAuthContext();
  const { values, handleChange, getFormData } = useFormData({
    email: "",
    password: "",
  });

  const {
    error,
    loading,
    refetch: login,
  } = useFetch("/login", { method: "POST" }, false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = getFormData();

    const result = await login({ body: formData });

    if (result?.message && !result.error) {
      toast.success(result.message);
      setUser(result?.user);
      setToken(result?.token);

      navigate("/dashboard");

      return;
    }

    if (result?.error) {
      toast.warning(result.error, {
        closeButton: true,
      });

      return;
    }
  };

  return (
    <>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold">Welcome Back</h2>
        <p className="text-sm text-muted-foreground">
          Please enter your details to log in
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col">
          <Label htmlFor="email" className="mb-2">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="text"
            values={values.email}
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
            id="password"
            name="password"
            type="password"
            values={values.password}
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
          {loading ? <DotLoading /> : "Login"}
        </Button>
      </form>
    </>
  );
}
