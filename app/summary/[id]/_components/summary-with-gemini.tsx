"use client";

import { summaryWithGemini, summaryWithVertex } from "../actions";
import { useFormState } from "react-dom";

interface SummaryWithGeminiProps {
  postId: number;
}

const SummaryWithGemini = ({ postId }: SummaryWithGeminiProps) => {
  const [state, action] = useFormState(summaryWithGemini, null);
  return (
    <form action={action}>
      <button
        className="absolute right-5 bottom-3 bg-white text-primary rounded-md py-1 px-2 border"
        value={postId}
        name="postId"
      >
        SummaryWithGemini
      </button>
    </form>
  );
};

export default SummaryWithGemini;
