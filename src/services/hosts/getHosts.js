import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getHosts = async () => {
  return prisma.host.findMany();
};

export default getHosts;
