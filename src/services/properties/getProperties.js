import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getProperties = async ({ location, pricePerNight, amenities }) => {
  const filter = {};

  // Filtering by location with case-insensitive matching
  if (location) {
    filter.location = { contains: location };
  }

  // Filtering by exact price per night
  if (pricePerNight) {
    filter.pricePerNight = Number(pricePerNight);
  }

  // Filtering by amenity name (case-sensitive)
  if (amenities) {
    filter.amenities = {
      some: {
        name: amenities, // Match exact amenity name in the database
      },
    };
  }

  console.log("Applied Filter:", filter);

  // Execute the query
  return prisma.property.findMany({
    where: filter,
    include: { amenities: true }, // Include amenities to confirm matches
  });
};

export default getProperties;
