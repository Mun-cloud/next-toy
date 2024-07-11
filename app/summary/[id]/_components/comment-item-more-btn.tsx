import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { deleteComment } from "../actions";

interface CommentItemMoreBtnProps {
  onAddCocommentClick: () => void;
  onEditToggle: () => void;
  isOwner: boolean;
  commentId: number;
}

const CommentItemMoreBtn = ({
  onAddCocommentClick,
  onEditToggle,
  isOwner,
  commentId,
}: CommentItemMoreBtnProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisVerticalIcon className="size-[25px] hover:bg-secondary rounded-full hover:text-primary" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <button type="button" onClick={onAddCocommentClick}>
            add cocomment
          </button>
        </DropdownMenuItem>

        {isOwner && (
          <>
            <DropdownMenuItem>
              <button type="button" onClick={onEditToggle}>
                edit comment
              </button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <form action={async (formData) => await deleteComment(formData)}>
                <input type="hidden" name="commentId" value={commentId} />
                <button type="submit">delete comment</button>
              </form>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CommentItemMoreBtn;
