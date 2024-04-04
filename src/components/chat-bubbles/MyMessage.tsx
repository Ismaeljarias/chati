import { getFirstLetterOfEmail } from "@/utils";
import { useUser } from "@clerk/nextjs";

interface Props {
  text: string;
  email: string;
}

export const MyMessage = ({ text, email }: Props) => {
  return (
    <div className="col-start-6 col-end-13 p-3 rounded-lg">
      <div className="flex items-center justify-start flex-row-reverse">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
          {email || "U"}
        </div>
        <div className="relative mr-3 text-sm bg-indigo-700 py-2 px-4 shadow rounded-xl">
          <div>{text}</div>
        </div>
      </div>
    </div>
  );
};
