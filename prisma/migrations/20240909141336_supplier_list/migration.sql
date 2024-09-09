-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "business";

-- AlterTable
ALTER TABLE "public"."aac_user" ADD COLUMN     "creator" TEXT,
ADD COLUMN     "updater" TEXT;

-- CreateTable
CREATE TABLE "business"."supplier_list" (
    "id" SERIAL NOT NULL,
    "supplierCode" TEXT NOT NULL,
    "supplierName" TEXT NOT NULL,
    "remark" TEXT,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "creator" TEXT,
    "updater" TEXT,

    CONSTRAINT "supplier_list_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business"."customer_list" (
    "id" SERIAL NOT NULL,
    "customerCode" TEXT NOT NULL,
    "customerName" TEXT NOT NULL,
    "remark" TEXT,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "creator" TEXT,
    "updater" TEXT,

    CONSTRAINT "customer_list_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "supplier_list_supplierCode_key" ON "business"."supplier_list"("supplierCode");

-- CreateIndex
CREATE UNIQUE INDEX "customer_list_customerCode_key" ON "business"."customer_list"("customerCode");
