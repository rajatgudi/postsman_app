import { sideBarIconsTypes } from "@/types/menu.types";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { IoHeartOutline, IoHomeOutline } from "react-icons/io5";
import { PiLayoutDuotone, PiUserDuotone } from "react-icons/pi";
export const sideBarIcons: sideBarIconsTypes[] = [
  {
    Icon: IoHomeOutline,
    label: "Home",
    route: "/",
    imgUrl: "",
  },
  {
    Icon: MagnifyingGlassIcon,
    label: "Search",
    route: "/search",
    imgUrl: "",
  },
  {
    Icon: PiLayoutDuotone,
    label: "Explore",
    route: "/explore",
    imgUrl: "",
  },
  {
    Icon: IoHeartOutline,
    label: "Notifications",
    route: "/notifications",
    imgUrl: "",
  },
  {
    Icon: PlusCircleIcon,
    label: "Create",
    route: "/create",
    imgUrl: "",
  },
  {
    Icon: PiUserDuotone,
    label: "Profile",
    route: "/profile",
    imgUrl: "",
  },
];
