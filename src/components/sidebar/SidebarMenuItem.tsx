"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  icon: React.ReactNode;
  path: string;
  title: string;
}

export const SidebarMenuItem = ({ icon, path, title }: Props) => {
  const router = useRouter();
  const pathName = usePathname();

  return (
    <>
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
    </>
  );
};
