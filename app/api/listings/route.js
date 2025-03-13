import getCurrentUser from "../../actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "../../libs/prismadb";

export async function POST(request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }
  const body = await request.json();
  const {
    title,
    description,
    imageSrc,
    category,
    location,
    guestCount,
    roomCount,
    bathroomCount,
    price,
  } = body;
  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      imageSrc,
      category,
      guestCount,
      bathroomCount,
      roomCount,
      locationValue: location.value,
      price: parseInt(price, 10),
      userId: currentUser.id,
    },
  });
  return NextResponse.json(listing);
}
