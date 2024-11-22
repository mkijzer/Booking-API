import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createUser = async (
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture
) => {
  if (!username || !password || !email) {
    const error = new Error("Username, password, and email are required");
    error.status = 400;
    throw error;
  }

  const existingUser = await prisma.user.findFirst({
    where: { OR: [{ username }, { email }] },
  });

  if (existingUser) {
    return existingUser;
  }

  return await prisma.user.create({
    data: {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
    },
  });
};

export default createUser;
