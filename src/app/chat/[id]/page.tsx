import React from "react";
import AdminChat from "@/chat/components/AdminChat";

export const metadata: Metadata = {
  title: "Chat Admin User",
  description: "Chat with our bot",
};

export default async function ChatViewPage() {
  return (
    <div>
      <AdminChat />
    </div>
  );
}
