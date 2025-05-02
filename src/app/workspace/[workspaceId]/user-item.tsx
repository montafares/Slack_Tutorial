import { cva, VariantProps } from "class-variance-authority";
import { Id } from "../../../../convex/_generated/dataModel";
import { UseWorkspaceId } from "@/hooks/use-workspace-id";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

const userItemsVariants = cva(
  "flex iemms-center gap-1.5 justify-start font-normal h-7 px-4 text-sm overflow-hidden",
  {
    variants: {
      variant: {
        default: "text-[#f9edffcc]",
        active: "bg-white/90 text-[#481349] hover:bg-white/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface UserItemProps {
  id: Id<"members">;
  label?: string;
  image?: string;
  variant?: VariantProps<typeof userItemsVariants>["variant"];
}

export const UserItem = ({ id, label, image, variant }: UserItemProps) => {
  const workspaceId = UseWorkspaceId();
  const avatarFallBack = label?.charAt(0).toUpperCase();

  return (
    <Button
      variant="transparent"
      size="sm"
      asChild
      className={cn(userItemsVariants({ variant }))}
    >
      <Link href={`/workspace/${workspaceId}/member/${id}`}>
        <Avatar className="size-6 rounded-md mr-1">
          <AvatarImage className="rounded-md" src={image} />
          <AvatarFallback className="bg-sky-500 text-white rounded-md text-sm">
            {avatarFallBack}
          </AvatarFallback>
        </Avatar>
        <span className="text-sm truncate">{label}</span>
      </Link>
    </Button>
  );
};
