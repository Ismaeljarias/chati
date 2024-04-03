"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { generateRandomAnimePhrases } from "@/utils";

export const sleep = async (seconds: number = 0) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, seconds * 1000);
  });
};

export async function createChatSession(startedByClerkUserId: string) {
  if (!startedByClerkUserId) {
    throw new Error("Clerk user id is required to start a chat session");
  }

  const chatSession = await prisma.chatSession.create({
    data: {
      startedByClerkUserId,
    },
  });

  if (!chatSession) {
    throw new Error("Chat session not created");
  }

  return chatSession;
}

async function getBotResponse() {
  const botResponses = await generateRandomAnimePhrases();
  const responseIndex = Math.floor(Math.random() * botResponses.length);
  return botResponses[responseIndex];
}

export async function saveBotResponse(sessionId: string) {
  const botResponse = await getBotResponse();

  await prisma.message.create({
    data: {
      content: botResponse.content,
      clerkUserId: botResponse.clerkUserId,
      sessionId: sessionId,
      isBot: true,
    },
  });

  revalidatePath("/chat");
}

export async function createMessage({
  content,
  clerkUserId,
  sessionId,
  isBot = false,
}: {
  content: string;
  clerkUserId: string;
  sessionId: string;
  isBot: boolean;
}) {
  try {
    const message = await prisma.message.create({
      data: {
        content,
        clerkUserId,
        sessionId,
        isBot,
      },
    });

    revalidatePath("/chat");
    return message;
  } catch (error) {
    return {
      message: "An error occurred while creating the todo. Please try again.",
    };
  }
}

export async function getChatMessages(sessionId: string) {
  const messages = await prisma.message.findMany({
    where: {
      sessionId,
    },
  });

  return messages.map((message) => ({
    id: message.id,
    content: message.content,
    isBot: message.isBot,
  }));
}
