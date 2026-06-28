/*
  Warnings:

  - You are about to drop the column `isBillingPosted` on the `flight_bookings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "flight_bookings" DROP COLUMN "isBillingPosted";

-- CreateTable
CREATE TABLE "sync_logs" (
    "id" SERIAL NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" INTEGER,
    "status" TEXT NOT NULL,
    "errorMessage" TEXT,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishedAt" TIMESTAMP(3),

    CONSTRAINT "sync_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "booking_events" (
    "id" SERIAL NOT NULL,
    "flightBookingId" INTEGER,
    "hotelBookingId" INTEGER,
    "tourBookingId" INTEGER,
    "fromStatus" TEXT,
    "toStatus" TEXT NOT NULL,
    "triggeredBy" TEXT,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "booking_events_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "booking_events" ADD CONSTRAINT "booking_events_flightBookingId_fkey" FOREIGN KEY ("flightBookingId") REFERENCES "flight_bookings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking_events" ADD CONSTRAINT "booking_events_hotelBookingId_fkey" FOREIGN KEY ("hotelBookingId") REFERENCES "hotel_bookings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking_events" ADD CONSTRAINT "booking_events_tourBookingId_fkey" FOREIGN KEY ("tourBookingId") REFERENCES "tour_bookings"("id") ON DELETE SET NULL ON UPDATE CASCADE;
