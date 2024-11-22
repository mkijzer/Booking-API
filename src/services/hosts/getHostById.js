import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getHostById = async (id) => {
  const host = await prisma.host.findUnique({
    where: { id },
  });

  if (!host) {
    throw new Error(`Host with id ${id} not found`);
  }

  return host;
};
export default getHostById;
