"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/authContext";
import { useLoginMutation } from "@/state/api";
import { LoginSchema, LoginType } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PiSpinner } from "react-icons/pi";
import { toast } from "sonner";
const LoginForm = () => {
  const { login } = useAuth();
  const [triggerLogin, { isLoading }] = useLoginMutation();
  async function handleLogin(values: LoginType) {
    console.log("data", values);
    const loginres = await triggerLogin(values);
    console.log(loginres)
    if (loginres?.error) {
      //@ts-expect-error erere
      toast.error(loginres?.error?.data?.message, { position: "top-right" });
    }
    if (loginres?.data) {
      toast.success("Login successful!", { position: "top-right" });
      login?.(loginres?.data?.accessToken);
    }
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    mode: "onChange",
    resolver: zodResolver(LoginSchema),
  });
  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <div className="grid gap-2">
        <div className="grid gap-1">
          <Label className="sr-only" htmlFor="email">
            Email
          </Label>
          <Input
            id="email"
            {...register("email")}
            placeholder="Email name@example.com"
            type="email"
            disabled={isLoading}
          />
          {errors.email && (
            <p className="text-red-700 text-small-regular">
              {errors.email.message}
            </p>
          )}
          <Input
            {...register("password")}
            id="password"
            placeholder="Password"
            type="password"
            disabled={isLoading}
          />
          {errors.password && (
            <p className="text-red-700 text-small-regular">
              {errors.password.message}
            </p>
          )}
        </div>
        <Button disabled={isLoading}>
          {isLoading && <PiSpinner className="mr-2 h-4 w-4 animate-spin" />}
          {"Log in with Email"}
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
