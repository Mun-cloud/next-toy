import { dateFormatter } from "@/lib/utils";
import { Prisma } from "@prisma/client";

type CocommentType = Prisma.CoCommentGetPayload<{
  include: { author: { select: { id: true; name: true } } };
}>;

const CocommentItem = ({ cocomment }: { cocomment: CocommentType }) => {
  return (
    <div className="flex justify-between py-1 pl-16">
      <div className="flex flex-col gap-px break-all">
        <span>{cocomment.content}</span>
        <span className="text-[12px] text-secondary/70">
          {cocomment.author.name} - {dateFormatter(cocomment.createdAt)}
        </span>
      </div>
    </div>
  );
};

export default CocommentItem;
