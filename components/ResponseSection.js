import { StatusCode } from "/public/StausCodes";
import { ClockIcon } from "../public/SVGs";
import CodeBox from "./CodeBox";

const ResponseSection = ({ responseTime, response }) => {
  return (
    <div className="w-full h-[85vh] border text-black ">
      <div className="flex w-full h-[5vh] items-center justify-between pr-4">
        <h1 className="text-xl p-2">Response</h1>
        {responseTime && (
          <div
            className={`flex items-center gap-2 p-2 rounded-md font-bold ${
              responseTime > 1000 ? "text-red-500" : "text-green-500"
            }`}
          >
            <ClockIcon />
            <span>{responseTime}ms</span>
          </div>
        )}
        {response?.status && (
          <div
            className={`flex gap-3 p-1 px-3 rounded-md font-bold ${getClasses(
              response.status
            )}`}
          >
            <span>{response.status}</span>
            <span>{StatusCode[response.status]}</span>
          </div>
        )}
      </div>
      <CodeBox
        readOnly
        value={
          response?.status
            ? JSON.stringify(response.data, null, 2)
            : JSON.stringify(response, null, 2)
        }
        placeholder="Response will appear here."
      />
    </div>
  );
};

export default ResponseSection;

const StatusColors = [
  " bg-yellow-200 text-yellow-800 ",
  " bg-yellow-200 text-yellow-800 ",
  " bg-green-200 text-green-800 ",
  " bg-red-200 text-red-800 ",
  " bg-red-200 text-red-800 ",
];

const getClasses = (code) => StatusColors[Math.floor(code / 100)] || "";
