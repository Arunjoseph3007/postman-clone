import { useState, useRef } from "react";
import InputGroup from "../InputGroup";
import GetCodeDialog from "../GetCodeDialog";
import { PlusIcon } from "../../public/SVGs";
import CodeBox from '../CodeBox'
//https://jsonplaceholder.typicode.com/todos/1

const newItem = { key: "", value: "", active: true };

const RequestSection = ({ selectedRequest, setSelectedRequest }) => {
  const [openTab, setOpenTab] = useState("body");
  const getCodeRef = useRef();

  if (!selectedRequest) {
    return <div className="w-full h-1/2 border text-black p-3"></div>;
  }

  return (
    <div className="w-full border text-black resize-x flex flex-col">
      {/* Tab controls */}
      <div>
        <div className="flex h-[5vh] items-center">
          <button
            className={`shadow-sm shrink p-2 px-3 ${
              openTab === "body" && "bg-gray-200"
            }`}
            onClick={() => setOpenTab("body")}
          >
            Body
          </button>
          <button
            className={`shadow-sm p-2 px-3 pr-8 ${
              openTab === "headers" && "bg-gray-200"
            }`}
            onClick={() => setOpenTab("headers")}
          >
            Headers{" "}
            <span className="text-xs text-gray-500">
              {selectedRequest.headers.length}
            </span>
          </button>
          <button
            className={`shadow-sm p-2 px-3 pr-8 ${
              openTab === "params" && "bg-gray-200"
            }`}
            onClick={() => setOpenTab("params")}
          >
            Params{" "}
            <span className="text-xs text-gray-500">
              {selectedRequest.params.length}
            </span>
          </button>
        </div>
      </div>

      {/* Body Section */}
      <CodeBox
        value={selectedRequest.data}
        spellCheck={true}
        placeholder="Enter body of request"
        name={"data"}
        style={{ display: openTab !== "body" && "none" }}
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
