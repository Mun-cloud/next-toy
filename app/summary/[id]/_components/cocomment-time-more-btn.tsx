import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { deleteCocomment } from "../actions";

interface CocommentTimeMoreBtnProps {
  editToggle: () => void;
  cocommentId: number;
}

const CocommentTimeMoreBtn = ({
  editToggle,
  cocommentId,
}: CocommentTimeMoreBtnProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="h-fit my-auto">
        <EllipsisVerticalIcon className="size-[25px] hover:bg-secondary rounded-full hover:text-primary" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <button type="button" onClick={editToggle}>
            edit cocomment
          </button>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <form action={deleteCocomment}>
            <button value={cocommentId} name="cocommentId">
              delete cocomment
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CocommentTimeMoreBtn;
