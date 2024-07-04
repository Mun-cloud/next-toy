"use client";

import { useEffect } from "react";
import { summaryWithGemini } from "../actions";
import { useFormState } from "react-dom";

interface SummaryWithGeminiProps {
  postId: number;
}

const SummaryWithGemini = ({ postId }: SummaryWithGeminiProps) => {
  const [state, action] = useFormState(summaryWithGemini, null);
  useEffect(() => {
    console.log(state);
  }, [state]);
  return (
    <form action={action}>
      <button
        className="absolute right-5 bottom-3 bg-secondary text-primary rounded-md py-1 px-2"
        value={postId}
        name="postId"
      >
        SummaryWithGemini
      </button>
    </form>
  );
};

export default SummaryWithGemini;
