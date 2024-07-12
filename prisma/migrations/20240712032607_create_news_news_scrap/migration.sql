/*
  Warnings:

  - You are about to drop the `NewsBookmark` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "NewsBookmark_link_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "NewsBookmark";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "News" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "press" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "summary" TEXT,
    "content" TEXT,
    "url" TEXT NOT NULL,
    "image" TEXT,
    "category" TEXT,
    "author" TEXT,
    "sentiment" TEXT
);

-- CreateTable
CREATE TABLE "Keyword" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "NewsKeyword" (
    "newsId" TEXT NOT NULL,
    "keywordId" TEXT NOT NULL,

    PRIMARY KEY ("newsId", "keywordId"),
    CONSTRAINT "NewsKeyword_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "News" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "NewsKeyword_keywordId_fkey" FOREIGN KEY ("keywordId") REFERENCES "Keyword" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "NewsScrap" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" INTEGER NOT NULL,
    "newsId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "NewsScrap_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "NewsScrap_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "News" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "authorId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Post" ("authorId", "content", "createdAt", "id", "published", "title", "updatedAt") SELECT "authorId", "content", "createdAt", "id", "published", "title", "updatedAt" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
CREATE INDEX "Post_authorId_idx" ON "Post"("authorId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "News_url_key" ON "News"("url");

-- CreateIndex
CREATE INDEX "News_title_idx" ON "News"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Keyword_name_key" ON "Keyword"("name");

-- CreateIndex
CREATE UNIQUE INDEX "NewsScrap_userId_newsId_key" ON "NewsScrap"("userId", "newsId");
