import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const updateUserById = async (
  id,
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture
) => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    throw new Error(`User with ID ${id} not found`);
  }

  const updatedUser = await prisma.user.update({
    where: { id },
    data: { username, password, name, email, phoneNumber, profilePicture },
  });

  return { message: `User with id ${id} was updated!`, user: updatedUser };
};

export default updateUserById;
