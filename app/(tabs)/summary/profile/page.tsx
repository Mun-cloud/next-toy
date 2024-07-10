import { cachedProfileBookmarks, getMyPosts, getUser, logout } from "./actions";
import Button from "@/app/_components/Button";
import ProfilePostItem from "./_components/profile-post-item";
import { unstable_cache as nextCache } from "next/cache";
import { getSession } from "@/lib/session";
import { getCachedBookmark } from "../../news/actions";
import NewsBookmarkItem from "./_components/news-bookmark-item";

const getCachedMyPost = nextCache(
  async (userId: number) => getMyPosts(userId),
  ["my-posts"],
  {
    tags: ["my-posts"],
  }
);

const ProfilePage = async () => {
  const session = await getSession();
  const user = await getUser();
  const posts = await getCachedMyPost(session.id!);
  const newsBookmarks = await cachedProfileBookmarks();

  return (
    <div className="px-4 pb-[60px]">
      <div className="flex justify-between pt-10 items-center">
        <div className="">Email: {user.email}</div>
        <form action={logout}>
          <Button>logout</Button>
        </form>
      </div>

      <div className="pt-12 max-h-[50vh]">
        <h3 className="text-[20px] pb-1 px-2">Your Posts</h3>
        <div className="divide-y border-y h-full overflow-y-auto">
          {posts.map((post) => (
            <ProfilePostItem post={post} key={`your-post-${post.id}`} />
          ))}
        </div>
      </div>

          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
