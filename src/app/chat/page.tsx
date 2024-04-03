export const dynamic = "force-dynamic";
export const revalidate = 0;

import React from "react";
import { Chat } from "@/chat";
import { getChatMessages } from "@/chat/actions/chat-actions";
import { cookies } from "next/headers";

export default async function ChatPage() {
  const cookieStore = cookies();
  const sessionId = cookieStore.get("chat")?.value || "";

  const messages = await getChatMessages(sessionId);

  return (
    <>
      <Chat messages={messages} />
    </>
  );
}
