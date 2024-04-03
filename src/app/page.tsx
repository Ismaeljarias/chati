import { redirect } from "next/navigation";

export default function Home() {
  redirect("/chat");
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl text-center text-gray-800">Welcome</h1>
    </main>
  );
}
