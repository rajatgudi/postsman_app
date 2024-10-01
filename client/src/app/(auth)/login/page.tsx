"use client";
import logo from "@/assets/images/logo.png";
import UserAuthForm from "@/components/shared/user-auth-form";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/authContext";
import { EnumAuthTypes } from "@/enums";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { PiGithubLogo } from "react-icons/pi";
const Page = () => {
  const router = useRouter();
  const { setTheme } = useTheme();
  const { isAuthenticated } = useAuth();
  console.log("isAuthenticated", isAuthenticated);
  useEffect(() => {
    setTheme("light");
  }, [setTheme]);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);
  return (
    <>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center items-center">
          <Image src={logo} height={200} width={200} alt="" />
          <p className="text-sm text-muted-foreground">
            Sign in to see photos and videos from your friends.
          </p>
        </div>

        <div className={"grid gap-6"}>
          <UserAuthForm type={EnumAuthTypes.login} />
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <Button variant="outline" type="button">
            <PiGithubLogo className="mr-2 h-4 w-4" />
            GitHub
          </Button>
        </div>
        <div className="grid gap-2 ">
          <div className="text-center text-muted-foreground">
            Dont have an account?{" "}
            <Link
              href={"/signup"}
              className="text-blue cursor-pointer font-semibold"
            >
              Sign up
            </Link>
          </div>
        </div>
        <p className="px-8 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our{" "}
          <Link
            href="/terms"
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </>
  );
};

export default Page;
