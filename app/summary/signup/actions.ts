"use server";

import db from "@/lib/db";
import { setSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z
  .object({
    email: z.string(),
  })
  .superRefine(async ({ email }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "이미 존재하는 이메일 입니다.",
        path: ["email"],
        fatal: true,
      });
      return z.NEVER;
    }
  });

export const userLogin = async (_: any, formData: FormData) => {
  const data = {
    email: formData.get("email"),
  };
  const result = await schema.spa(data);
  if (!result.success) {
    return result.error.flatten().fieldErrors;
  } else {
    const user = await db.user.create({
      data: {
        email: result.data.email,
      },
      select: { id: true },
    });

    await setSession(user.id);
    redirect("/summary/profile");
  }
};
