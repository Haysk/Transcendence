-- CreateTable
CREATE TABLE "Techs" (
    "id" SERIAL NOT NULL,
    "technoname" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "details" TEXT NOT NULL,

    CONSTRAINT "Techs_pkey" PRIMARY KEY ("id")
);
