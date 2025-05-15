-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "image" TEXT,
    "desc" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "images" TEXT[],
    "address" TEXT NOT NULL,
    "lat" TEXT NOT NULL,
    "lng" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "bedroomDesc" TEXT,
    "freeCancel" BOOLEAN NOT NULL DEFAULT false,
    "selfCheckIn" BOOLEAN NOT NULL DEFAULT false,
    "officeSpace" BOOLEAN NOT NULL DEFAULT false,
    "hasMountainView" BOOLEAN NOT NULL DEFAULT false,
    "hasShampoo" BOOLEAN NOT NULL DEFAULT false,
    "hasFreeLaundry" BOOLEAN NOT NULL DEFAULT false,
    "hasAirConditioner" BOOLEAN NOT NULL DEFAULT false,
    "hasWifi" BOOLEAN NOT NULL DEFAULT false,
    "hasBarbeque" BOOLEAN NOT NULL DEFAULT false,
    "hasFreeParking" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Room_userId_idx" ON "Room"("userId");

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
