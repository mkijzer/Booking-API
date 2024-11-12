import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const updatePropertyById = async (id, data) => {
  console.log("Updating property with ID:", id, "Data:", data);

  if (!id || !data || Object.keys(data).length === 0) {
    throw new Error("Property ID and update data are required");
  }

  const updatedProperty = await prisma.property.update({
    where: { id },
    data,
  });

  return updatedProperty;
};

export default updatePropertyById;
