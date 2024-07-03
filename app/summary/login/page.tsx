"use client";

import { useFormState } from "react-dom";
import Button from "../../_components/Button";
import Input from "../../_components/Input";
import { Login } from "./action";
import Link from "next/link";

const LoginPage = () => {
  const [errors, action] = useFormState(Login, null);

  return (
    <div className="flex flex-col items-center justify-center h-[100vh]">
      <div className="mb-8 text-3xl">Login</div>
      <form className="w-[408px] flex flex-col gap-3" action={action}>
        <Input label="email" name="email" errors={errors?.email} />
        <div className="flex gap-3 justify-center">
          <Link href="/summary/signup">
            <Button className="mx-0" type="button">
              sign up
            </Button>
          </Link>
          <Button className="mx-0">login</Button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
