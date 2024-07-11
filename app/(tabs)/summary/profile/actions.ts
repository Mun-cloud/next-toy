"use server";

import db from "@/lib/db";
import { getSession } from "@/lib/session";
import { revalidateTag, unstable_cache as nextCache } from "next/cache";
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

export const getMyPosts = async (userId: number) => {
  if (userId) {
    return await db.post.findMany({
      where: { authorId: userId },
      select: {
        id: true,
        title: true,
        createdAt: true,
        published: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
  notFound();
};

export const deletePost = async (formData: FormData) => {
  const id = Number(formData.get("postId"));
  await db.post.delete({
    where: { id },
    select: { id: true },
  });

  revalidateTag("my-posts");
  revalidateTag("posts");
};

const getBookmarks = async (userId: number) => {
  const bookmarks = await db.newsBookmark.findMany({
    where: { userId },
    select: {
      id: true,
      title: true,
      description: true,
      pubDate: true,
      link: true,
    },
  });
  return bookmarks;
};

export const cachedProfileBookmarks = async () => {
  const session = await getSession();

  const cachedData = nextCache(
    () => getBookmarks(session.id!),
    ["profile-bookmarks"],
    { tags: ["profile-bookmarks"] }
  );
  return cachedData();
};

export const profileBookmarkDelete = async (formData: FormData) => {
  const id = Number(formData.get("id"));
  await db.newsBookmark.delete({
    where: { id },
  });
  revalidateTag("profile-bookmarks");
};
