import { useEffect, useRef } from "react";
import { addCocomment } from "../actions";

interface AddCocomentFormProps {
  onClose: () => void;
  commentId: number;
}

const AddCocomentForm = ({ onClose, commentId }: AddCocomentFormProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div
      className="flex items-center justify-between gap-4 px-4 h-[55px]"
      ref={ref}
    >
      <div>답글 추가</div>
      <form
        ref={formRef}
        className="flex gap-1.5 grow"
        action={(formData) => {
          addCocomment(formData);
          formRef.current?.reset();
          onClose();
        }}
      >
        <input type="hidden" value={commentId} name="parentId" />
        <input
          className="border rounded-md px-2 py-1 w-44 text-primary grow"
          name="content"
          required
        />
        <div className="flex gap-1">
          <button
            className="text-[14px] hover:bg-secondary hover:text-primary px-2.5 rounded-md transition-colors"
            type="button"
            onClick={onClose}
          >
            취소
          </button>
          <button
            className="text-[14px] bg-secondary/80 hover:bg-secondary text-primary px-2.5 rounded-md transition-colors"
            type="submit"
          >
            저장
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCocomentForm;
