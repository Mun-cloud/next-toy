import { getSession } from "@/lib/session";

import { getMyPosts, getUser, logout } from "./actions";
import { redirect } from "next/navigation";
import Button from "@/app/_components/Button";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const ProfilePage = async () => {
  const user = await getUser();
  const posts = await getMyPosts();

  return (
    <div className="px-4">
      <div className="flex justify-between pt-10 items-center">
        <div className="">Email: {user.email}</div>
        <form action={logout}>
          <Button>logout</Button>
        </form>
      </div>

      <div className="pt-12">
        <h3 className="text-[20px] pb-1 px-2">Your Posts</h3>
        <div className="divide-y border-y">
          {posts.map((post) => (
            <div
              key={post.id}
              className="py-1 px-2 flex justify-between items-center"
            >
              <div>
                <div className="text-[14px]">{post.title}</div>
                <div className="text-[12px] text-gray-400">
                  {new Intl.DateTimeFormat("ko-KR").format(post.createdAt)} /{" "}
                  {post.published ? "게시중" : "게시중단"}
                </div>
              </div>
              <Link
                href={`/summary/${post.id}/edit`}
                className="rounded-full hover:bg-gray-800 transition-colors"
              >
                <EllipsisVerticalIcon className="size-6" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
