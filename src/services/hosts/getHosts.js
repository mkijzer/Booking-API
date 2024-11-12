import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getHosts = async ({ name }) => {
  const filter = {};

  if (name) filter.name = { contains: name.toLowerCase() };

  return prisma.host.findMany({
    where: filter,
  });
};

export default getHosts;
