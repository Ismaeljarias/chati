"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  icon: React.ReactNode;
  path: string;
  title: string;
}

export const SidebarMenuItem = ({ icon, path, title }: Props) => {
  const pathName = usePathname();
  const { user } = useUser();

  return (
    <div className="flex flex-col justify-between h-full">
      <Link
        href={path}
        className={
          path === pathName
            ? "flex justify-center items-center bg-gray-800 rounded-md p-2 transition-colors"
            : "flex justify-center items-center hover:bg-gray-800 rounded-md p-2 transition-colors"
        }
      >
        <div className="flex items-center justify-center w-10 h-10">{icon}</div>
        <div className="flex flex-col flex-grow">
          <span className="text-white text-lg font-semibold">{title}</span>
        </div>
      </Link>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-10 w-10",
              },
              variables: {
                colorPrimary: "#ff7000",
              },
            }}
          />
          <span className="text-xs">
            {user?.primaryEmailAddress?.emailAddress}
          </span>
        </div>
      </div>
    </div>
  );
};
