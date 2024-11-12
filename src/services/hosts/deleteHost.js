import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const deleteHost = async (id) => {
  console.log("Attempting to delete host with ID:", id);

  const deletedHost = await prisma.host.deleteMany({
    where: { id },
  });

  if (!deletedHost || deletedHost.count === 0) {
    throw new Error(`Host with id ${id} not found`);
  }

  return id;
};

export default deleteHost;
