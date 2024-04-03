import { auth } from "@clerk/nextjs";

export const dynamic = "force-dynamic";
export const revalidate = 0;

import React from "react";
import { Chat } from "@/chat";
import { getChatMessages } from "@/chat/actions/chat-actions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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
