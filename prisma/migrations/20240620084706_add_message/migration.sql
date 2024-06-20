-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "originUserId" TEXT NOT NULL,
    "destinationUserId" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Message_id_key" ON "Message"("id");
