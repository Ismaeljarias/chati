import { getFirstLetterOfEmail } from "@/utils";
import { useUser } from "@clerk/nextjs";
import Markdown from "react-markdown";

interface Props {
  text: string;
  email: string;
  time: string;
}

export const MyMessage = ({ text, email, time }: Props) => {
  return (
    <div className="col-start-6 col-end-13 p-3 rounded-lg">
      <div className="flex items-center justify-start flex-row-reverse">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
          {email || "U"}
        </div>
        <div className="relative mr-3 text-sm bg-indigo-700 py-2 px-4 pb-6 shadow rounded-xl">
          <Markdown>{text}</Markdown>

          <small className="absolute bottom-1 right-2 text-[10px]">
            {time}
          </small>
        </div>
      </div>
    </div>
  );
};
