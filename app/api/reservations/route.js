import getCurrentUser from "../../actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "../../libs/prismadb";

export async function POST(request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }
  const body = await request.json();
  const { totalPrice, startDate, endDate, listingId } = body;
  if (!listingId || !startDate || !endDate || !totalPrice) {
    return NextResponse.error();
  }
  const listingAndReservation = await prisma.listing.update({
    where: { id: listingId },
    data: {
      reservations: {
        create: { userId: currentUser.id, startDate, endDate, totalPrice },
      },
    },
  });
  return NextResponse.json(listingAndReservation);
}
