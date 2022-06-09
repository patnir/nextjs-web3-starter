import { Prisma } from "@prisma/client";
import { prisma } from "lib/prisma.server";

export async function getUser(id: string) {
  return await prisma.user.findUnique({
    where: { id },
  });
}

export async function updateUser(id: string, data: Prisma.UserUpdateInput) {
  return await prisma.user.update({
    where: { id },
    data,
  });
}
