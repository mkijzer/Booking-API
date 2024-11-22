import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const deleteHost = async (id) => {
  try {
    const deletedHost = await prisma.host.delete({
      where: { id },
    });
    return deletedHost;
  } catch (error) {
    if (error.code === "P2025") {
      const notFoundError = new Error(`Host with id ${id} not found`);
      notFoundError.statusCode = 404;
      throw notFoundError;
    }
    throw error;
  }
};

export default deleteHost;
