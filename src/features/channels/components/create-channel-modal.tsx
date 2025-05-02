import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";
import { useCreateChannelModal } from "../store/use-create-channel-modal";
import { UseWorkspaceId } from "@/hooks/use-workspace-id";
import { UseCreateChannel } from "../api/use-create-channel";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const CreateChannelModal = () => {
  const workspaceId = UseWorkspaceId();
  const [isOpen, setIsOpen] = useCreateChannelModal();
  const [name, setName] = useState("");
  const router = useRouter();
  const { mutate, isPending } = UseCreateChannel();
  const handleClose = () => {
    setIsOpen(false);
    setName("");
  };
  const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s+/g, "-").toLowerCase();
    setName(value);
  };
  // const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(
      { name, workspaceId },
      {
        onSuccess: (id) => {
          toast.success("Channel created ");
          router.push(`/workspace/${workspaceId}/channel/${id}`);
          handleClose();
        },
        onError: (error) => {
          toast.error("Failed to create channel ");
          console.error("Error creating workspace:", error);
        },
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a channel</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            value={name}
            onChange={handlechange}
            placeholder=" e.g. plan-budget"
            required
            disabled={isPending}
            autoFocus
            minLength={3}
          />
          <div className="flex justify-end ">
            <Button disabled={isPending}>
              {isPending ? "Creating..." : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
