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
  console.log("Creating user with:", {
    username,
    password,
    name,
    email,
    phoneNumber,
    profilePicture,
  });

  if (!username || !password || !email) {
    throw new Error("Username, password, and email are required");
  }

  const existingUser = await prisma.user.findUnique({ where: { username } });
  if (existingUser) {
    throw new Error("Username already exists");
  }

  return prisma.user.create({
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
