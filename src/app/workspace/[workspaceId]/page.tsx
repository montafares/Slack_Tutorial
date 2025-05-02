"use client";

import { UsegetChannels } from "@/features/channels/api/use-get-channels";
import { useCreateChannelModal } from "@/features/channels/store/use-create-channel-modal";
import { useCurrentMember } from "@/features/members/api/use-current-members";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { UseWorkspaceId } from "@/hooks/use-workspace-id";
import { Loader, TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

const WorkspaceIdPage = () => {
  const router = useRouter();
  const workspaceId = UseWorkspaceId();
  const [open, setOpen] = useCreateChannelModal();

  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({
    id: workspaceId,
  });
  const { data: channels, isLoading: channelLoading } = UsegetChannels({
    workspaceId,
  });
  const { data: member, isLoading: memberloading } = useCurrentMember({
    workspaceId,
  });
  const isAdmin = useMemo(() => member?.role === "admin", [member?.role]);
  console.log("====================================");
  console.log(isAdmin, "admin or not");
  console.log("====================================");
  const channelId = useMemo(() => channels?.[0]?._id, [channels]);
  console.log("member", member);

  useEffect(() => {
    if (
      workspaceLoading ||
      channelLoading ||
      !workspace ||
      memberloading ||
      !member
    )
      return;

    if (channelId) {
      router.push(`/workspace/${workspaceId}/channel/${channelId}`);
    } else if (!open && isAdmin) setOpen(true);
  }, [
    channelId,
    member,
    memberloading,
    isAdmin,
    workspaceLoading,
    channelLoading,
    workspace,
    open,
    setOpen,
    router,
    workspaceId,
  ]);
  if (workspaceLoading || channelLoading || memberloading) {
    return (
      <div className="h-full flex-1 flex items-center justify-center flex-col gap-2">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }
  if (!workspace || !member) {
    return (
      <div className="h-full flex-1 flex items-center justify-center flex-col gap-2">
        <TriangleAlert className="size-6 animate-spin text-muted-foreground" />
        <span className=" text-sm text-muted-foreground">
          Workspace not found
        </span>
      </div>
    );
  }
  return (
    <div className="h-full flex-1 flex items-center justify-center flex-col gap-2">
      <TriangleAlert className="size-6  text-muted-foreground" />
      <span className=" text-sm text-muted-foreground">Channel not found</span>
    </div>
  );
};
export default WorkspaceIdPage;
