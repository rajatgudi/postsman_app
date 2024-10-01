"use client";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import darkLogo from "@/assets/images/logo2.png";
import lightLogo from "@/assets/images/logo.png";
import { useAppDispatch } from "@/state/store";
import { setIsDarkMode } from "@/state/features/global";
const Header = () => {
  const { theme, setTheme } = useTheme();
  const dispatch = useAppDispatch();
  return (
    <nav className="top-header">
      <Link href={"/"} className="flex items-center gap-4">
        <Image
          className="hover:scale-105 duration-150 pt-2 pb-2 pl-4"
          alt=""
          src={theme === "dark" ? darkLogo : lightLogo || darkLogo}
          height={120}
          width={120}
        />
        {theme}
        {/* <h4 className="hover:scale-105 duration-150 pt-5 pl-5">Instagram</h4> */}
      </Link>

      <div className="flex items-center gap-3">
        <div className="dark:bg-gray-900 bg-gray-200 p-2 cursor-pointer rounded-full">
          {" "}
          <div className="block text-light-1">
            {theme !== "light" ? (
              <SunIcon
                onClick={() => {
                  setTheme("light");
                  dispatch(setIsDarkMode(false));
                }}
                className="h-5 w-5 dark:text-white text-blue"
              />
            ) : (
              <MoonIcon
                onClick={() => {
                  setTheme("dark");
                  dispatch(setIsDarkMode(true));
                }}
                className="h-5 w-5 dark:text-white text-blue"
              />
            )}

            {/**/}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
