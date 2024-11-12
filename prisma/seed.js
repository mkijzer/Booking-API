import { PrismaClient } from "@prisma/client";

import userData from "../src/data/users.json" assert { type: "json" };
import propertyData from "../src/data/properties.json" assert { type: "json" };
import bookingData from "../src/data/bookings.json" assert { type: "json" };
import reviewData from "../src/data/reviews.json" assert { type: "json" };
import amenityData from "../src/data/amenities.json" assert { type: "json" };
import hostData from "../src/data/hosts.json" assert { type: "json" };

const prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });

async function main() {
  const { users } = userData;
  const { properties } = propertyData;
  const { bookings } = bookingData;
  const { reviews } = reviewData;
  const { amenities } = amenityData;
  const { hosts } = hostData;

  // Insert Users
  for (const user of users) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: user,
    });
  }

  // Insert Hosts
  for (const host of hosts) {
    await prisma.host.upsert({
      where: { id: host.id },
      update: {},
      create: host,
    });
  }

  // Insert Amenities
  for (const amenity of amenities) {
    await prisma.amenity.upsert({
      where: { id: amenity.id },
      update: {},
      create: amenity,
    });
  }

  // Insert Properties and Connect Amenities
  for (const property of properties) {
    await prisma.property.upsert({
      where: { id: property.id },
      update: {},
      create: {
        ...property,
        amenities: {
          connect: property.amenities
            ? property.amenities.map((amenityId) => ({ id: amenityId }))
            : [],
        },
      },
    });
  }

  // Insert Bookings
  for (const booking of bookings) {
    await prisma.booking.upsert({
      where: { id: booking.id },
      update: {},
      create: booking,
    });
  }

  // Insert Reviews
  for (const review of reviews) {
    await prisma.review.upsert({
      where: { id: review.id },
      update: {},
      create: review,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
