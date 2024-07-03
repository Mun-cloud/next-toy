"use client";

import { useFormState } from "react-dom";
import Button from "../../_components/Button";
import Input from "../../_components/Input";
import { userLogin } from "./actions";

const SignupPage = () => {
  const [errors, action] = useFormState(userLogin, null);

  return (
    <div className="flex items-center justify-center h-[100vh]">
      <form className="w-[408px] flex flex-col gap-3" action={action}>
        <Input label="email" name="email" errors={errors?.email} />
        <Button>sign up</Button>
      </form>
    </div>
  );
};

export default SignupPage;
