-- CreateIndex
CREATE INDEX "CoComment_authorId_parentId_idx" ON "CoComment"("authorId", "parentId");

-- CreateIndex
CREATE INDEX "Comment_authorId_postId_idx" ON "Comment"("authorId", "postId");

-- CreateIndex
CREATE INDEX "Post_authorId_idx" ON "Post"("authorId");
