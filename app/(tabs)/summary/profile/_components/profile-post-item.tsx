import { Prisma } from "@prisma/client";
import PostMoreBtn from "./post-more-btn";
import dayjs from "dayjs";
import Link from "next/link";

interface ProfilePostItemProps {
  post: Prisma.PostGetPayload<{
    select: {
      id: true;
      title: true;
      published: true;
      createdAt: true;
    };
  }>;
}

const ProfilePostItem = ({ post }: ProfilePostItemProps) => {
  return (
    <Link
      href={`/summary/${post.id}`}
      className="py-1 px-2 flex justify-between items-center"
    >
      <div>
        <div className="text-[14px]">{post.title}</div>
        <div className="text-[12px] text-gray-400">
          {new Intl.DateTimeFormat("ko-KR").format(new Date(post.createdAt))} /{" "}
          {post.published ? "게시중" : "게시중단"}
        </div>
      </div>
      <PostMoreBtn postId={post.id} />
    </Link>
  );
};

export default ProfilePostItem;
