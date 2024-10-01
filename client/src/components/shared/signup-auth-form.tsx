"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/authContext";
import { useSignUpMutation } from "@/state/api";
import { SignUpSchema, SignUpType } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PiSpinner } from "react-icons/pi";
import { toast } from "sonner";
const SignUpForm = () => {
  const { login } = useAuth();
  const [triggerSignUp, { isLoading }] = useSignUpMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpType>({
    mode: "onChange",
    resolver: zodResolver(SignUpSchema),
  });
  const handleSignUp = async (values: SignUpType) => {
    console.log("values", values);
    const signupres = await triggerSignUp({
      email: values.email,
      name: values.name || "",
      password: values.password,
      username: values.username,
    });
    console.log("signupres", signupres);
    if (signupres?.error) {
      //@ts-expect-error erere
      toast.error(signupres?.error?.data?.message, {
        position: "top-right",
      });
    }
    if (signupres?.data) {
      reset();
      toast.success("SignUp Successful!", { position: "top-right" });
      login?.(signupres?.data?.accessToken);
    }
  };
  return (
    <form onSubmit={handleSubmit(handleSignUp)}>
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
          />{" "}
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
          />{" "}
          {errors.password && (
            <p className="text-red-700 text-small-regular">
              {errors.password.message}
            </p>
          )}
          <Input
            {...register("confirmPassword")}
            id="confirmPassword"
            placeholder="Confirm Password"
            type="password"
            disabled={isLoading}
          />{" "}
          {errors.confirmPassword && (
            <p className="text-red-700 text-small-regular">
              {errors.confirmPassword.message}
            </p>
          )}
          <Input
            {...register("name")}
            id="name"
            placeholder="Full Name"
            type="text"
            disabled={isLoading}
          />{" "}
          {errors.name && (
            <p className="text-red-700 text-small-regular">
              {errors.name.message}
            </p>
          )}
          <Input
            {...register("username")}
            id="username"
            placeholder="Username"
            type="text"
            disabled={isLoading}
          />{" "}
          {errors.username && (
            <p className="text-red-700 text-small-regular">
              {errors.username.message}
            </p>
          )}
        </div>
        <Button disabled={isLoading}>
          {isLoading && <PiSpinner className="mr-2 h-4 w-4 animate-spin" />}
          {"Sign Up"}
        </Button>
      </div>
    </form>
  );
};

export default SignUpForm;
