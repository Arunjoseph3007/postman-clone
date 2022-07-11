import axios from "axios";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { useState, useRef } from "react";
import InputGroup from "../InputGroup";
import GetCodeDialog from "../GetCodeDialog";
import { PlusIcon } from "../../public/SVGs";
//https://jsonplaceholder.typicode.com/todos/1

const newItem = { key: "", value: "", active: true };

const RequestSection = ({ selectedRequest, setSelectedRequest }) => {
  const [openTab, setOpenTab] = useState("body");
  const getCodeRef = useRef();

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
              openTab === "params" && "bg-gray-200"
            }`}
            onClick={() => setOpenTab("params")}
          >
            Params{" "}
            <span className="rounded-full bg-black text-white h-5 aspect-square absolute right-0 text-sm mr-2">
              {selectedRequest.params.length}
            </span>
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

      {/* Params section */}
      <div
        style={{ display: openTab !== "params" && "none" }}
        className="w-full max-h-[40vh] overflow-auto "
      >
        {selectedRequest.params.map((param, i) => (
          <InputGroup
            key={i}
            index={i}
            selectedRequest={selectedRequest}
            setSelectedRequest={setSelectedRequest}
            object={param}
            name="params"
          />
        ))}
        <button
          className="bg-black text-white px-5 py-2 mt-3 rounded-md"
          onClick={() =>
            setSelectedRequest((prev) => ({
              ...prev,
              params: [...prev.params, newItem],
            }))
          }
        >
          <PlusIcon />
        </button>
      </div>

      <GetCodeDialog
        selectedRequest={selectedRequest}
        getCodeRef={getCodeRef}
      />
    </div>
  );
};

export default RequestSection;
