"use server";

import db from "@/lib/db";
import { setSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
  email: z
    .string({ required_error: "이메일을 입력해 주세요." })
    .refine(userExists, "존재하지 않는 이메일주소 입니다."),
});

async function userExists(email: string) {
  const exists = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  return Boolean(exists);
}

export const Login = async (_: any, formData: FormData) => {
  const data = {
    email: formData.get("email"),
  };
  const result = await schema.spa(data);

  if (!result.success) {
    return result.error.flatten().fieldErrors;
  } else {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
      },
    });
    if (user?.id) {
      await setSession(user.id);
      redirect("/summary/profile");
    }
  }
};
