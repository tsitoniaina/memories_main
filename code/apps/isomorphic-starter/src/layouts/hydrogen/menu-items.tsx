import { routes } from "@/config/routes";
import {
  PiUserCircleDuotone,
  PiShootingStarDuotone,
  PiRocketLaunchDuotone,
} from "react-icons/pi";

export const menuItems = (lang: string | string[] | undefined) => {
  return [
    {
      name: "Welcome",
      href: routes.welcome,
      icon: <PiShootingStarDuotone />,
    },
    {
      name: "Profile",
      href: `/${lang}${routes.viewprofile}`,
      icon: <PiUserCircleDuotone />,
    },
    {
      name: "Coming soon",
      href: routes.comingSoon,
      icon: <PiRocketLaunchDuotone />,
    },
  ];
};

