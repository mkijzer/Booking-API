import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const deleteAmenity = async (id) => {
  const deletedAmenity = await prisma.amenity.deleteMany({
    where: { id },
  });

  if (!deletedAmenity || deletedAmenity.count === 0) {
    throw new Error(`Amenity with id ${id} not found`);
  }

  return id;
};

export default deleteAmenity;
