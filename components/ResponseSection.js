import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { json, jsonParseLinter } from "@codemirror/lang-json";
import { StatusCode } from "../public/StausCodes";

const ResponseSection = ({ responseTime, response }) => {
  return (
    <div className="w-full h-1/2 border text-black p-3">
      <div className="flex w-full items-center justify-between pr-4">
        <h1 className="text-4xl">Response</h1>
        {responseTime && (
          <div
            className={`flex gap-3 p-2 rounded-md ${
              responseTime > 1000 ? "text-red-500" : "text-green-500"
            }`}
          >
            <span>Response Time: {responseTime}ms</span>
          </div>
        )}
        {response?.status && (
          <div
            className={`flex gap-3 p-2 rounded-md ${getClasses(
              response.status
            )}`}
          >
            <span>Status: {response.status}</span>
            <span>Message: {StatusCode[response.status]}</span>
          </div>
        )}
      </div>
      <CodeMirror
        readOnly
        theme="dark"
        value={
          response?.status === 200
            ? JSON.stringify(response.data, null, 2)
            : JSON.stringify(response, null, 2)
        }
        placeholder="some text"
        className="w-full rounded-md overflow-hidden border mt-4"
        height="200px"
        extensions={[json()]}
      />
    </div>
  );
};

export default ResponseSection;

const StatusColors = {
  1: " bg-yellow-200 text-yellow-800 ",
  2: " bg-green-200 text-green-800 ",
  3: " bg-yellow-200 text-yellow-800 ",
  4: " bg-red-200 text-red-800 ",
  5: " bg-red-200 text-red-800 ",
};

const getClasses = (code) => StatusColors[code.toString().charAt(0)] || "";
