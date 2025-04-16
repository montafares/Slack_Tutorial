"use client";

import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { UseWorkspaceId } from "@/hooks/use-workspace-id";

const WorkspacePage = () => {
  const workspaceId = UseWorkspaceId();
  const { data } = useGetWorkspace({ id: workspaceId });
  return <div>Data :{JSON.stringify(data)}</div>;
};
export default WorkspacePage;
