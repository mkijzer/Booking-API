import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createHost = async (
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture,
  aboutMe
) => {
  if (!username || !password || !email) {
    const error = new Error("Username, password, and email are required");
    error.status = 400;
    throw error;
  }

  const existingHost = await prisma.host.findFirst({
    where: { OR: [{ username }, { email }] },
  });

  if (existingHost) {
    const error = new Error("Username or email already exists");
    error.status = 400;
    throw error;
  }

  return await prisma.host.create({
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
};

export default createHost;
