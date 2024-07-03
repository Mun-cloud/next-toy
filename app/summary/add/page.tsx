"use client";

import Button from "@/app/_components/Button";
import Input from "@/app/_components/Input";
import { uploadArticle } from "./action";
import { useFormState } from "react-dom";
import Checkbox from "@/app/_components/Checkbox";

const SummaryAddPage = () => {
  const [errors, action] = useFormState(uploadArticle, null);
  return (
    <div className="flex flex-col items-center">
      <div className="pt-[100px] pb-[40px] text-center">
        <h1 className="font-bold text-[25px]">Add Article</h1>
        <p>Please write your good article!</p>
      </div>
      <form
        className="max-w-lg w-full px-[20px] flex flex-col gap-3"
        action={action}
      >
        <Input label="title" name="title" />
        <div>
          <div className="text-[20px]">content</div>
          <div className="border rounded-md p-2 h-[300px]">
            <textarea
              className="resize-none bg-inherit w-full h-full"
              name="content"
            />
          </div>
        </div>
        <div className="flex items-center">
          <div className="text-[20px] w-[120px]">published</div>
          <Checkbox name="published" />
        </div>
        <Button>Publish</Button>
      </form>
    </div>
  );
};

export default SummaryAddPage;
