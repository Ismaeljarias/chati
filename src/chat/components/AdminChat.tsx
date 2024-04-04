"use client";

import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";

import { Message, MyMessage } from "@/components";
import { getChatMessages } from "@/chat/actions/chat-actions";
import { getFirstLetterOfEmail, timeAgo } from "@/utils";

export default function AdminChat() {
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") || "";

  const [messages, setMessages] = useState<
    | {
        id: string;
        content: string;
        isBot: boolean;
        createdAt: Date;
      }[]
    | []
  >([]);

  useEffect(() => {
    async function fetchChatMessages() {
      const messages = await getChatMessages(params?.id);

      setMessages(messages);
    }

    void fetchChatMessages();
  }, [params?.id]);

  console.log(messages);

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {messages.map((message) =>
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
                email={getFirstLetterOfEmail(email) || ""}
                time={timeAgo(message.createdAt)}
              />
            ),
          )}
        </div>
      </div>
    </div>
  );
}
