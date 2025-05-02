import { useQuery } from "convex/react";
import { Id } from "../../../../convex/_generated/dataModel";
import { api } from "../../../../convex/_generated/api";

interface UsegetChannelsProps {
  workspaceId: Id<"workspaces">;
}

export const UsegetChannels = ({ workspaceId }: UsegetChannelsProps) => {
  const data = useQuery(api.channnels.get, { workspaceId });
  const isLoading = data === undefined;

  return { data, isLoading };
};
