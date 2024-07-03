import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";

const CommentItemMoreBtn = ({ onClick }: { onClick: () => void }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisVerticalIcon className="size-[25px] hover:bg-secondary rounded-full hover:text-primary" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <button type="button" onClick={onClick}>
            add cocomment
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CommentItemMoreBtn;
