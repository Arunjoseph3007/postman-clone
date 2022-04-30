import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { json, jsonParseLinter } from "@codemirror/lang-json";
import { StatusCode } from "../public/StausCodes";

const ResponseSection = ({ selectedRequest, response }) => {
  return (
    <div className="w-full h-1/2 border text-black p-3">
      <div className="flex w-full items-center justify-between pr-4">
        <h1 className="text-4xl">Response</h1>
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
  1: "yellow",
  2: "green",
  3: "yellow",
  4: "red",
  5: "red",
};

const getClasses = (code) => {
  const color = StatusColors[code.toString().charAt(0)] || "";
  return ` bg-${color}-200 text-${color}-800 `;
};
