-- CreateTable
CREATE TABLE "aac_user" (
    "id" SERIAL NOT NULL,
    "userCode" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "password" TEXT,
    "salt" TEXT,
    "email" TEXT NOT NULL,
    "mobile" TEXT,
    "telephone" TEXT,
    "remark" TEXT,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "aac_user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "aac_user_userCode_key" ON "aac_user"("userCode");
