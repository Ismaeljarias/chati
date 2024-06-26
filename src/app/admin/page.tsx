import { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

import React from "react";
import Link from "next/link";
import { getAllUsers } from "@/admin/admin-actions";
import { IoChevronDown } from "react-icons/io5";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Chat Admin Page",
  description: "Chat with our bot",
};

export default async function AdminPage() {
  const user = await currentUser();
  const isAdmin = user?.emailAddresses[0].emailAddress === "admin@admin.com"; // Yes it is hardcoded I know

  if (!isAdmin) {
    redirect("/chat");
  }

  const users = await getAllUsers();

  if (users.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center gap-3 mt-5">
        <h1 className="sr-only">Chat History</h1>
        <Link className="btn-primary" href={"/chat"}>
          Go back
        </Link>
        <h1 className="text-xl">No chat history</h1>
      </div>
    );
  }

  return (
    <main className="flex flex-col items-center m-5">
      <h1 className="sr-only">Chat History</h1>

      <Link className="btn-primary" href={"/chat"}>
        Go back
      </Link>
      <div className="m-auto mt-8 flow-root w-full sm:w-[80%]">
        <div className="-mx-6 -my-2">
          <div className="inline-block min-w-full px-6 py-2 align-middle">
            <div className="overflow-x-auto rounded-lg shadow ring-1 ring-black ring-opacity-5">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="w-[62px] py-3.5 pl-4 pr-3 text-left text-sm font-semibold hidden sm:table-cell text-gray-900">
                      ID
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Email
                    </th>
                    <th className="relative py-3.5 pl-3 pr-4">
                      <span className="sr-only">View Chat</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:w-auto hidden sm:table-cell">
                        {user.id}
                      </td>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                        {user.email}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-4 pr-4 text-right text-sm font-medium">
                        <Link
                          href={`/chat/${user.id}?email=${user.email}`}
                          className="inline-flex items-center text-indigo-600 hover:text-indigo-900"
                          data-testid={`chat-${user.email}`}
                        >
                          View Chat
                          <IoChevronDown className="ml-2 h-4 w-4" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
