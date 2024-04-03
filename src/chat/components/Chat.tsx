"use client";

import React, { useOptimistic, useState, useTransition } from "react";
import { Message, MyMessage, TextMessageBox, TypingLoader } from "@/components";
import {
  createChatSession,
  createMessage,
  saveBotResponse,
  sleep,
} from "@/chat/actions/chat-actions";
import { useAuth } from "@clerk/nextjs";
import { getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

type Props = {
  messages: { id: string; content: string; isBot: boolean }[];
};

export const Chat = ({ messages }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { userId } = useAuth();
  const chatCookie = getCookie("chat");

  const [chatMessages, setChatMessages] = useState<
    { content: string; isBot: boolean }[]
  >([]);

  const [optimisticMessages, addOptimisticMessage] = useOptimistic<
    { id: string; content: string; isBot: boolean }[],
    string
  >(messages, (state, newMessage) => [
    ...state,
    {
      id: `2a0a1396-04a3-4a31-9bdd-8e31eb68013${userId}`,
      content: newMessage,
      isBot: false,
    },
  ]);

  const handlePost = async (text: string) => {
    if (!chatCookie) {
      const chatSession = await createChatSession(userId!!);
      setCookie("chat", chatSession.id);
      router.refresh();
    }

    setChatMessages((prev) => [...prev, { content: text, isBot: false }]);
    const _tempChatSession = getCookie("chat") || "";

    await createMessage({
      content: text,
      clerkUserId: userId!!,
      sessionId: _tempChatSession,
      isBot: false,
    });

    startTransition(async () => {
      await saveBotResponse(_tempChatSession);
    });
  };

  const onHandlePost = async (text: string) => {
    try {
      startTransition(() => addOptimisticMessage(text));
      await handlePost(text);
    } catch (error) {
      startTransition(() => addOptimisticMessage(text));
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <Message text="Hola, I'm goku, how can I help you?" />

          {optimisticMessages.map((message) =>
            message.isBot ? (
              <Message key={message.id} text={message.content} />
            ) : (
              <MyMessage key={message.id} text={message.content} />
            ),
          )}

          {isPending && (
            <div className="col-start-1 col-end-12 fade-in">
              <TypingLoader />
            </div>
          )}
        </div>
      </div>

      <TextMessageBox
        onSendMessage={onHandlePost}
        placeholder="Start typing..."
        disableCorrections
      />
    </div>
  );
};
