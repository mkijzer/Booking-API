import { PrismaClient } from "@prisma/client";
import notFoundErrorHandler from "../../middleware/notFoundErrorHandler.js";

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
  const updatedUser = await prisma.user.updateMany({
    where: {
      id,
    },
    data: {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
    },
  });

  if (!updatedUser || updatedUser.count === 0) {
    throw new notFoundErrorHandler("User", id);
  }

  return {
    message: `User with id ${id} was updated!`,
  };
};

export default updateUserById;
