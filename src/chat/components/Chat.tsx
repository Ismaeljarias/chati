"use client";

import React, { useOptimistic, useState, useTransition } from "react";
import { Message, MyMessage, TextMessageBox, TypingLoader } from "@/components";
import {
  createChatSession,
  createMessage,
  saveBotResponse,
} from "@/chat/actions/chat-actions";
import { useUser } from "@clerk/nextjs";
import { getCookie } from "cookies-next";
import { getFirstLetterOfEmail, timeAgo } from "@/utils";

type Props = {
  messages: {
    id: string;
    content: string;
    isBot: boolean;
    createdAt: Date;
  }[];
};

export const Chat = ({ messages }: Props) => {
  const [isPending, startTransition] = useTransition();

  const { user } = useUser();

  const [chatMessages, setChatMessages] = useState<
    { content: string; isBot: boolean }[]
  >([]);

  const [optimisticMessages, addOptimisticMessage] = useOptimistic<
    { id: string; content: string; isBot: boolean; createdAt: Date }[],
    string
  >(messages, (state, newMessage) => [
    ...state,
    {
      id: `2a0a1396-04a3-4a31-9bdd-8e31eb68013${user?.id}`,
      content: newMessage,
      isBot: false,
      createdAt: new Date(),
    },
  ]);

  const handlePost = async (text: string) => {
    await createChatSession(user?.id!!);

    setChatMessages((prev) => [...prev, { content: text, isBot: false }]);
    const _tempChatSession = getCookie("chat") || "";

    if (messages.length === 0) {
      await createMessage({
        content: "Hola, I'm Goku, how can I help you?",
        clerkUserId: user?.id!!,
        sessionId: getCookie("chat") || "",
        isBot: true,
      });
    }

    await createMessage({
      content: text,
      clerkUserId: user?.id!!,
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
          {messages.length === 0 && (
            <Message
              text="Hola, I'm goku, how can I help you?"
              time={timeAgo(new Date().toISOString())}
            />
          )}

          {optimisticMessages.map((message) =>
            message.isBot ? (
              <Message
                key={message.id}
                text={message.content}
                time={timeAgo(message.createdAt)}
              />
            ) : (
              <MyMessage
                key={message.id}
                text={message.content}
                email={
                  getFirstLetterOfEmail(user?.emailAddresses[0].emailAddress) ||
                  ""
                }
                time={timeAgo(message.createdAt)}
              />
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
      />
    </div>
  );
};
