"use server";

import db from "@/lib/db";
import { getSession } from "@/lib/session";
import { notFound, redirect } from "next/navigation";

export const getUser = async () => {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: { id: session.id },
      select: { email: true, name: true, posts: true },
    });
    if (user) {
      return user;
    }
  }
  notFound();
};

export const logout = async () => {
  const session = await getSession();
  session.destroy();
  redirect("/summary/login");
};

export const getMyPosts = async () => {
  const session = await getSession();
  if (session.id) {
    return await db.post.findMany({
      where: { authorId: session.id },
      select: {
        id: true,
        title: true,
        createdAt: true,
        published: true,
      },
    });
  }
  notFound();
};
