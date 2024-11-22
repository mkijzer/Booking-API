import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getProperties = async ({ location, pricePerNight, amenities }) => {
  const filter = {};

  if (location) {
    filter.location = { contains: location };
  }

  if (pricePerNight) {
    filter.pricePerNight = Number(pricePerNight);
  }

  if (amenities) {
    filter.amenities = {
      some: {
        name: amenities,
      },
    };
  }

  console.log("Applied Filter:", filter);

  return prisma.property.findMany({
    where: filter,
    include: { amenities: true },
  });
};

export default getProperties;
