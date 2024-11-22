import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const updateHostById = async (
  id,
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture,
  aboutMe
) => {
  const host = await prisma.host.findUnique({ where: { id } });
  if (!host) {
    throw new Error(`Host with ID ${id} not found`);
  }

  const updatedHost = await prisma.host.update({
    where: { id },
    data: {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
    },
  });

  return { message: `Host with id ${id} was updated!`, host: updatedHost };
};

export default updateHostById;
