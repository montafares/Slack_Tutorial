"use client";

import { useParams } from "next/navigation";
import { Id } from "../../convex/_generated/dataModel";

export const UseChannelId = () => {
  const params = useParams();

  return params.channelId as Id<"channels">;
};
