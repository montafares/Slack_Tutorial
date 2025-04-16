import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCreateWorkspaceModal } from "../store/use-create-workspace-modal";
import { UseCreateWorkspace } from "../api/use-create-workspace";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const CreateWorkspaceModal = () => {
  const { mutate, isPending } = UseCreateWorkspace();
  const [isOpen, setIsOpen] = useCreateWorkspaceModal();
  const [name, setName] = useState("");
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(
      { name },
      {
        onSuccess: (id) => {
          toast.success("Workspace created successfully!");
          handleClose();
          router.push(`/workspace/${id}`);
        },
        onError: (error) => {
          console.error("Error creating workspace:", error);
        },
      }
    );
  };
  const handleClose = () => {
    setName("");
    setIsOpen(false);
  };
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a workspace</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Workspace name e.g. 'work' , 'Personal' , 'Home'"
            disabled={isPending}
            required
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
