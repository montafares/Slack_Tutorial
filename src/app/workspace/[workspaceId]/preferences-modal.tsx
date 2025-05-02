import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { UseRemoveWorkspace } from "@/features/workspaces/api/use-remove-workspace";
import { UseUpdateWorkspace } from "@/features/workspaces/api/use-update-workspace";
import { useConfirm } from "@/hooks/use-confirm";
import { UseWorkspaceId } from "@/hooks/use-workspace-id";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface PreferencesModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  intialvalue: string;
}

export default function PreferencesModal({
  open,
  setOpen,
  intialvalue,
}: PreferencesModalProps) {
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure you want to delete this workspace? This action cannot be undone.",
    "Delete Workspace"
  );
  const workspaceId = UseWorkspaceId();
  const router = useRouter();
  const [value, setValue] = useState(intialvalue);
  const [editOpen, setEditOpen] = useState(false);
  const { mutate: updateWorkspace, isPending: isUpadatingWorkspace } =
    UseUpdateWorkspace();
  const { mutate: removeWorkspace, isPending: isRemovingWorkspace } =
    UseRemoveWorkspace();
  const handlEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateWorkspace(
      {
        id: workspaceId,
        name: value,
      },
      {
        onSuccess: () => {
          toast.success("Workspace updated successfully!");
          setEditOpen(false);
        },
        onError: (error) => {
          toast.error("Error updating workspace: " + error.message);
        },
      }
    );
  };
  const handleRemove = async () => {
    const ok = await confirm();
    if (!ok) return;
    removeWorkspace(
      { id: workspaceId },
      {
        onSuccess: () => {
          toast.success("Workspace removed successfully!");
          router.replace("/");
        },
        onError: (error) => {
          toast.error("Error removing workspace: " + error.message);
        },
      }
    );
  };
  return (
    <>
      <ConfirmDialog />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 bg-gray-50 overflow-hidden">
          <DialogHeader className="p-4 bg-white border-b">
            <DialogTitle>{value}</DialogTitle>
          </DialogHeader>
          <div className="px-4 pb-4 flex flex-col gap-y-2">
            <Dialog open={editOpen} onOpenChange={setEditOpen}>
              <DialogTrigger asChild>
                <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer  hover:bg-gray-50">
                  <div className=" flex items-center justify-between">
                    <p className=" text-sm font-semibold">Workspace Name</p>
                    <p className="text-sm text-[#1264a3] hover:underline font-semibold">
                      Edit
                    </p>
                  </div>
                  <p className="text-sm">{value}</p>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Rename this workspace</DialogTitle>
                </DialogHeader>
                <form className="space-y-4" onSubmit={handlEdit}>
                  <Input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    disabled={isUpadatingWorkspace}
                    required
                    autoFocus
                    minLength={3}
                    maxLength={20}
                    placeholder="Workspace name e.g. 'work' , 'Personal' , 'Home'"
                  />
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button
                        disabled={isUpadatingWorkspace}
                        variant="outline"
                        onClick={() => setEditOpen(false)}
                      >
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button disabled={isUpadatingWorkspace}>Save</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
            <Button
              disabled={isRemovingWorkspace}
              onClick={handleRemove}
              className="flex items-center gap-x-2 px-5 bg-white rounded-lg border cursor-pointer hover:bg-gray-50 text-rose-600"
            >
              <TrashIcon className="size-4" />
              <p className="text-sm font-semibold">Delete Workspace</p>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
