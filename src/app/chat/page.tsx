import { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

import { auth } from "@clerk/nextjs";

import React from "react";
import { Chat } from "@/chat";
import { getChatMessages } from "@/chat/actions/chat-actions";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Chat Page",
  description: "Chat with our bot",
};

export default async function ChatPage() {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const messages = await getChatMessages(userId);

  return (
    <>
      <Chat messages={messages} />
    </>
  );
}
