import { prisma } from "lib/prisma.server";

export async function getAccountByProviderAccountId(
  provider: string,
  providerAccountId: string
) {
  return await prisma.account.findUnique({
    where: {
      provider_providerAccountId: {
        provider,
        providerAccountId,
      },
    },
    include: { user: true },
  });
}

export async function createAccountWithUser(
  provider: string,
  providerAccountId: string
) {
  return await prisma.account.create({
    data: {
      provider,
      providerAccountId: providerAccountId.toLocaleLowerCase(),
      user: { create: {} },
    },
    include: { user: true },
  });
}
