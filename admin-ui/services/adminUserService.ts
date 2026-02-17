import { prisma } from "@/lib/prisma";

export const adminUserService = {
  async listUsers() {
    const users = await prisma.adminUser.findMany({
      orderBy: { id: "desc" },
      include: {
        permissions: true,
      },
    });

    return users;
  },
};
