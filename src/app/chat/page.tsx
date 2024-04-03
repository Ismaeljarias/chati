"use client";

import React from "react";
import { Message, MyMessage, TextMessageBox, TypingLoader } from "@/components";

const messages = [
  {
    text: "Hola, I'm goku, how can I help you?",
    isBot: true,
  },
  {
    text: "Hi my name is Pepe",
    isBot: false,
  },
  {
    text: "Hi Pepe, How can I help you?",
    isBot: true,
  },
];

export default function ChatPage() {
  return (
    <>
      <div className="chat-container">
        <div className="chat-messages">
          <div className="grid grid-cols-12 gap-y-2">
            {/* Bienvenida */}
            <Message text="Hola, I'm goku, how can I help you?" />

            {messages.map((message, index) =>
              message.isBot ? (
                <Message key={index} text={message.text} />
              ) : (
                <MyMessage key={index} text={message.text} />
              ),
            )}

            {/*{isLoading && (*/}
            {/*  <div className="col-start-1 col-end-12 fade-in">*/}
            {/*    <TypingLoader />*/}
            {/*  </div>*/}
            {/*)}*/}
          </div>
        </div>

        <TextMessageBox
          onSendMessage={() => {}}
          placeholder="Start typing..."
          disableCorrections
        />
      </div>
    </>
  );
}
