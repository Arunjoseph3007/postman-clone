import axios from "axios";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { useState, useRef } from "react";
import {  PlusIcon } from "/public/SVGs";
import InputGroup from "../InputGroup";

const newItem = { key: "", value: "", active: true };

const RequestSection = ({ selectedRequest, setSelectedRequest }) => {
  const [openTab, setOpenTab] = useState("body");

  if (!selectedRequest) {
    return <div className="w-full h-1/2 border text-black p-3"></div>;
  }

  return (
    <div className="w-full border text-black resize-x">
      {/* Tab controls */}
      <div className="flex justify-between">
        <div>
          <button
            className={`shadow-sm p-2 px-4 text-xl ${
              openTab === "body" && "bg-gray-200"
            }`}
            onClick={() => setOpenTab("body")}
          >
            Body
          </button>
          <button
            className={`shadow-sm p-2 px-4 text-xl relative pr-8 ${
              openTab === "headers" && "bg-gray-200"
            }`}
            onClick={() => setOpenTab("headers")}
          >
            Headers{" "}
            <span className="rounded-full bg-black text-white h-5 aspect-square absolute right-0 text-sm mr-2">
              {selectedRequest.headers.length}
            </span>
          </button>
          <button
            className={`shadow-sm p-2 px-4 text-xl relative pr-8 ${
              openTab === "variables" && "bg-gray-200"
            }`}
            onClick={() => setOpenTab("variables")}
          >
            Variables
          </button>
        </div>
      </div>

      {/* Body Section */}
      <CodeMirror
        value={selectedRequest.data}
        spellCheck={true}
        placeholder="Enter body of request"
        name={"data"}
        theme="dark"
        style={{ display: openTab !== "body" && "none" }}
        className={`w-full border`}
        height="450px"
        extensions={[json()]}
        onChange={(value, v) => {
          setSelectedRequest((prev) => ({ ...prev, data: value }));
        }}
      />

      {/* Headers section */}
      <div
        style={{ display: openTab !== "headers" && "none" }}
        className="w-full max-h-[40vh] overflow-auto"
      >
        {selectedRequest.headers.map((header, i) => (
          <InputGroup
            key={i}
            index={i}
            selectedRequest={selectedRequest}
            setSelectedRequest={setSelectedRequest}
            object={header}
            name="headers"
          />
        ))}
        <button
          className="bg-black text-white px-5 py-2 mt-3 rounded-md"
          onClick={() =>
            setSelectedRequest((prev) => ({
              ...prev,
              headers: [...prev.headers, newItem],
            }))
          }
        >
          <PlusIcon />
        </button>
      </div>

      {/* Variables section */}
      <CodeMirror
        value={selectedRequest.variables}
        spellCheck={true}
        placeholder="Enter body of request"
        name={"data"}
        theme="dark"
        style={{ display: openTab !== "variables" && "none" }}
        className={`w-full border`}
        height="450px"
        extensions={[json()]}
        onChange={(value, v) => {
          setSelectedRequest((prev) => ({ ...prev, variables: value }));
        }}
      />

      {/* <GetCodeDialog
        selectedRequest={selectedRequest}
        getCodeRef={getCodeRef}
      /> */}
    </div>
  );
};

export default RequestSection;
