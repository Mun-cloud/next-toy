import { dateFormatter } from "@/lib/utils";
import { getComments } from "../actions";
import { unstable_cache as nextCache } from "next/cache";
import PostCommentItem from "./post-comment-item";
import { Fragment } from "react";
import CocommentItem from "./cocomment-item";

const getCachedComment = nextCache(
  async (postId) => getComments(postId),
  ["comments"],
  {
    tags: ["comments"],
  }
);

const PostComments = async ({ postId }: { postId: number }) => {
  const comments = await getCachedComment(postId);

  return (
    <div className="divide-y border-t overflow-y-auto">
      {comments.map((comment) => (
        <Fragment key={`comment-${comment.id}`}>
          <PostCommentItem comment={comment} />
          {comment.children.length > 0 &&
            comment.children.map((cocomment) => (
              <CocommentItem
                cocomment={cocomment}
                key={`cocomment-${cocomment.id}`}
              />
            ))}
        </Fragment>
      ))}
    </div>
  );
};

export default PostComments;