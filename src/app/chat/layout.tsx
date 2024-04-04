import { SidebarMenuItem } from "@/components";
import { IoCalendarOutline, IoLockClosed } from "react-icons/io5";
import { UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import Link from "next/link";

const menuItems = [
  {
    icon: <IoCalendarOutline />,
    title: "Chat",
    path: "/chat",
    testId: "chat",
  },
];

export default async function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = auth();
  const user = await currentUser();
  const isAdmin = user?.emailAddresses[0].emailAddress === "admin@admin.com";

  if (!userId) redirect("/sign-in");

  return (
    <main className="md:flex block flex-row mt-7 mx-5">
      <nav className="flex md:w-[370px] md:min-h-[calc(100vh-3.0rem)] flex-col md:ml-5 bg-white bg-opacity-10 p-5 rounded-3xl mb-5">
        <div className="flex justify-between md:block">
          <Link href={"/chat"}>
            <h1
              className="font-bold text-lg lg:text-3xl bg-gradient-to-br from-white via-white/50 bg-clip-text text-transparent"
              data-testid="logo"
            >
              Chati<span className="text-indigo-500">.</span>
            </h1>
          </Link>
          <span className="text-xl">Welcome</span>
        </div>

        <div className="border-gray-700 border my-3" />

        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-4">
            {menuItems.map((option) => (
              <SidebarMenuItem key={option.path} {...option} />
            ))}
            {isAdmin && (
              <SidebarMenuItem
                icon={<IoLockClosed />}
                title="Admin"
                path="/admin"
                testId="admin"
              />
            )}
          </div>

          <div className="flex flex-col pt-5">
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
                {user?.emailAddresses[0].emailAddress}
              </span>
            </div>
          </div>
        </div>
      </nav>

      <section className="md:mx-5 flex flex-col w-full h-[calc(100vh-50px)]  bg-white bg-opacity-10 p-5 rounded-3xl">
        <div className="flex flex-row h-full">
          <div className="flex flex-col flex-auto h-full p-1">{children}</div>
        </div>
      </section>
    </main>
  );
}
