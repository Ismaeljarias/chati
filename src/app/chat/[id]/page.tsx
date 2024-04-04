import React from "react";
import AdminChat from "@/chat/components/AdminChat";
import { Metadata } from "next";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Chat Admin User",
  description: "Chat with our bot",
};

export default async function ChatViewPage() {
  const user = await currentUser();
  const isAdmin = user?.emailAddresses[0].emailAddress === "admin@admin.com"; // Yes it is hardcoded I know

  if (!isAdmin) redirect("/chat");

  return (
    <div>
      <AdminChat />
    </div>
  );
}
