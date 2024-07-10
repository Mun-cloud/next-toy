"use server";

import db from "@/lib/db";
import { redirect } from "next/navigation";

import { z } from "zod";

const schema = z.object({
  id: z.coerce.number(),
  title: z
    .string({ required_error: "please write your post's title" })
    .min(1, "please write your post's title more than 1")
    .max(100, "please write your post's title less than 100"),
  content: z
    .string({ required_error: "please write your post's title" })
    .min(1, "please write your post's title more than 1")
    .max(5000, "please write your post's title less than 1000"),
  published: z.boolean(),
});

export const editPost = async (_: any, formData: FormData) => {
  const data = {
    id: formData.get("id"),
    title: formData.get("title"),
    content: formData.get("content"),
    published: formData.get("published") === "on" ? true : false,
  };

  const result = schema.safeParse(data);

  if (!result.success) {
    return result.error.flatten().fieldErrors;
  } else {
    const post = await db.post.update({
      where: {
        id: result.data.id,
      },
      data: {
        title: result.data.title,
        content: result.data.content,
        published: result.data.published,
      },
      select: {
        id: true,
      },
    });
    redirect(`/summary/${post.id}`);
  }
};
