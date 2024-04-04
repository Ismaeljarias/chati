import prisma from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs";

async function getClerkUsersInfo() {
  const userMetadata = await clerkClient.users.getUserList();
  return userMetadata
    .filter((user) => user.emailAddresses[0].emailAddress !== "admin@admin.com") // Yes it is hardcoded I know
    .map((user) => ({
      id: user.id,
      email: user.emailAddresses[0].emailAddress,
      firstName: user.firstName,
      lastName: user.lastName,
    }));
}

export async function getAllUsers() {
  const users = await getClerkUsersInfo();
  const usersWithChat = [];

  for (const user of users) {
    const chat = await prisma.chatSession.findFirst({
      where: {
        startedByClerkUserId: user.id,
      },
    });

    if (chat) {
      usersWithChat.push(user);
    }
  }

  if (!users) {
    return [];
  }

  return usersWithChat;
}
