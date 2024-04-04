"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Message, MyMessage } from "@/components";
import { getChatMessages } from "@/chat/actions/chat-actions";

export default function AdminChat() {
  const params = useParams<{ id: string; email: string }>();
  const [messages, setMessages] = useState<
    | {
        id: string;
        content: string;
        isBot: boolean;
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

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {messages.map((message) =>
            message.isBot ? (
              <Message key={message.id} text={message.content} />
            ) : (
              <MyMessage key={message.id} text={message.content} email={""} />
            ),
          )}
        </div>
      </div>
    </div>
  );
}
