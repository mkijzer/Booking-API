import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getUsers = async ({ username, email }) => {
  const filter = {};

  if (username) filter.username = { equals: username };
  if (email) filter.email = { equals: email };

  return prisma.user.findMany({
    where: filter,
  });
};

export default getUsers;
