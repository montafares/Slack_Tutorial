"use client";
import {
  AlertTriangle,
  HashIcon,
  Loader,
  MessageSquareText,
  SendHorizonalIcon,
} from "lucide-react";
import { useCurrentMember } from "@/features/members/api/use-current-members";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { UseWorkspaceId } from "@/hooks/use-workspace-id";
import { WorkspaceHeader } from "./workspace-header";
import { SidebarItem } from "./sidebar-items";
import { UsegetChannels } from "@/features/channels/api/use-get-channels";
import { WorkspaceSection } from "./workspace-section";
import { UserItem } from "./user-item";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { useCreateChannelModal } from "@/features/channels/store/use-create-channel-modal";
import { UseChannelId } from "@/hooks/use-channel-id";

export const WorkspaceSidebar = () => {
  const workspaceId = UseWorkspaceId();
  const channelId = UseChannelId();
  const [_open, setOpen] = useCreateChannelModal();
  console.log("====================================");
  console.log(_open);
  console.log("====================================");
  const { data: member, isLoading: memberLoading } = useCurrentMember({
    workspaceId,
  });
  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({
    id: workspaceId,
  });
  const { data: channels } = UsegetChannels({
    workspaceId,
  });
  const { data: members } = useGetMembers({
    workspaceId,
  });
  if (workspaceLoading || memberLoading) {
    return (
      <div className="flex flex-col bg-[#5e2c5f] h-full items-center justify-center">
        <Loader className=" size animate-spin text-white" />
      </div>
    );
  }

  if (!workspace || !member) {
    return (
      <div className="flex flex-col gap-y-2 bg-[#5e2c5f] h-full items-center justify-center">
        <AlertTriangle className=" size-5 text-white" />
        <p className="text-white text-sm">Workspace not found</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col bg-[#5e2c5f] h-full">
      <WorkspaceHeader
        workspace={workspace}
        isAdmin={member.role === "admin"}
      />
      <div className="flex flex-col px-2 mt-3">
        <SidebarItem label="Threads" icon={MessageSquareText} id="threads" />
        <SidebarItem
          label="Drafts & Sent"
          icon={SendHorizonalIcon}
          id="drafts"
        />
      </div>
      <WorkspaceSection
        hint="New Channel"
        label=" Channels"
        onNew={member?.role === "admin" ? () => setOpen(true) : undefined}
      >
        {channels?.map((item) => (
          <SidebarItem
            key={item._id}
            icon={HashIcon}
            label={item.name}
            id={item._id}
            variant={channelId === item._id ? "active" : "default"}
          />
        ))}
      </WorkspaceSection>

      <WorkspaceSection
        hint="New Direct"
        label=" Direct Messages"
        onNew={() => {}}
      >
        {members?.map((item) => (
          <UserItem
            id={item._id}
            key={item._id}
            image={item.user.image}
            label={item.user.name}
          />
        ))}
      </WorkspaceSection>
    </div>
  );
};
