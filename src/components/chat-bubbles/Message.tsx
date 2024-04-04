import Markdown from "react-markdown";

interface Props {
  text: string;
  time: string;
}

export const Message = ({ text, time }: Props) => {
  return (
    <div className="col-start-1 col-end-9 p-3 rounded-lg">
      <div className="flex flex-row items-start">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-600 flex-shrink-0">
          Bot
        </div>
        <div className="relative min-w-[80px] ml-3 text-sm bg-black bg-opacity-25 pt-3 px-4 pb-6 shadow rounded-xl">
          <Markdown>{text}</Markdown>
          <small className="absolute bottom-1 right-2 text-[10px]">
            {time}
          </small>
        </div>
      </div>
    </div>
  );
};
