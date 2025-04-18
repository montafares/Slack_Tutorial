"use client ";

import { SideBar } from "./sidebar";
import { Toolbar } from "./toolbar";

interface WorkspaceLayoutProps {
  children: React.ReactNode;
}

const WorkspaceIdLayout = ({ children }: WorkspaceLayoutProps) => {
  return (
    <div className="h-full">
      <Toolbar />
      <div className="flex h-[calc(100vh-40px)]">
        <SideBar /> {children}
      </div>
    </div>
  );
};

export default WorkspaceIdLayout;
