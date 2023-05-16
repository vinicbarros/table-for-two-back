-- CreateTable
CREATE TABLE "session" (
    "id" SERIAL NOT NULL,
    "customerId" INTEGER NOT NULL,
    "token" TEXT NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
