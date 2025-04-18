"use client";
import { Bell, HomeIcon, MessageSquare, MoreHorizontal } from "lucide-react";
import { Sidebarbutton } from "./sidebar-button";
import { WorkspaceSwitcher } from "./workspace-switcher";
import { UserButton } from "@/features/auth/components/user-button";
import { usePathname } from "next/navigation";

export const SideBar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-[70px] h-full bg-[#481349] flex flex-col items-center pt-[9px] pb-4 gap-y-4 ">
      <WorkspaceSwitcher />
      <Sidebarbutton
        icon={HomeIcon}
        label="Home"
        isActive={pathname.includes("/workspace")}
      />
      <Sidebarbutton icon={MessageSquare} label="DMs" isActive />
      <Sidebarbutton icon={Bell} label="Activity" />
      <Sidebarbutton icon={MoreHorizontal} label="More" />
      <div className=" flex flex-col items-center justify-center mt-auto gap-y-1">
        <UserButton />
      </div>
    </aside>
  );
};
