import { useState, useRef } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import axios from "axios";
import { ExclamationIcon, PlusIcon } from "../public/SVGs";
import InputGroup from "./InputGroup";
import GetCodeDialog from "./GetCodeDialog";
//https://jsonplaceholder.typicode.com/todos/1

const newItem = { key: "", value: "", active: true };

const RequestSection = ({
  setResponse,
  setResponseTime,
  selectedRequest,
  setSelectedRequest,
  saveSession,
  newSession,
}) => {
  const [openTab, setOpenTab] = useState("body");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ message: "" });
  const getCodeRef=useRef()

  const handleChange = (e) => {
    setSelectedRequest((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Ensure valid inputs
    if (!selectedRequest.url)
      return setMessage({ message: "Please Enter URL" });

    try {
      selectedRequest.data && JSON.parse(selectedRequest.data);
    } catch (e) {
      return setMessage({ message: e.message + " in body" });
    }

    //REQUEST
    try {
      setIsLoading(true);

      //Get data for request
      const config = {
        url: selectedRequest.url,
        method: selectedRequest.method,
        data: selectedRequest.data && JSON.parse(selectedRequest.data),
        headers: arrayToObjectFormatter(selectedRequest.headers),
        params: arrayToObjectFormatter(selectedRequest.params),
      };

      //Make request
      const start = new Date().getTime();
      const res = await axios(config);
      const end = new Date().getTime();

      //Make suitable state updates
      setResponseTime(end - start);
      setResponse(res);
      setIsLoading(false);
    } catch (e) {
      setResponse(e.response);
      setIsLoading(false);
    }
  };

  if (!selectedRequest) {
    return <div className="w-full h-1/2 border text-black p-3"></div>;
  }

  return (
    <div className="w-full border text-black p-3">
      {/* Head section */}
      <div className="flex items-center gap-4">
        <input
          value={selectedRequest.name}
          className="bg-transparent flex-1 text-4xl"
          onInput={handleChange}
          name="name"
        />
        <button
          className="bg-black text-white p-2 px-4 self-end rounded-md"
          onClick={saveSession}
        >
          Save Session
        </button>
        <button
          className="bg-black text-white p-2 px-4 self-end rounded-md"
          onClick={newSession}
        >
          New Session
        </button>
        <button
          className="bg-black text-white p-2 px-4 self-end rounded-md"
          onClick={()=>getCodeRef?.current?.showModal()}
        >
          Get Code
        </button>
      </div>

      {/* From sectiom */}
      <form
        onSubmit={handleSubmit}
        className="flex w-full border border-black rounded-xl overflow-hidden mt-4"
      >
        <select
          name="method"
          value={selectedRequest.method}
          onInput={handleChange}
          className="p-3 text-gray-600 border-r pr-6"
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
        <input
          name="url"
          type="text"
          placeholder="http://example.com"
          className="p-3 text-gray-600 flex-1"
          value={selectedRequest.url}
          onChange={handleChange}
        />
        <button
          disabled={isLoading}
          className="p-3 text-white bg-black"
          type="submit"
        >
          {isLoading ? "SENDING.." : "SEND"}
        </button>
      </form>

      {/* Tab controls */}
      <div className="flex mt-4 justify-between">
        <div>
          <button
            className={`shadow-sm rounded-t-lg p-2 px-4 text-xl ${
              openTab === "body" && "bg-gray-200"
            }`}
            onClick={() => setOpenTab("body")}
          >
            Body
          </button>
          <button
            className={`shadow-sm rounded-t-lg p-2 px-4 text-xl ${
              openTab === "headers" && "bg-gray-200"
            }`}
            onClick={() => setOpenTab("headers")}
          >
            Headers
          </button>
          <button
            className={`shadow-sm rounded-t-lg p-2 px-4 text-xl ${
              openTab === "params" && "bg-gray-200"
            }`}
            onClick={() => setOpenTab("params")}
          >
            Params
          </button>
        </div>
        {message.message && (
          <h1 className="text-md p-2 bg-gray-300 rounded flex items-center gap-2">
            {<ExclamationIcon />} {message.message}
          </h1>
        )}
      </div>

      {/* Body Section */}
      <CodeMirror
        value={selectedRequest.data}
        placeholder="Enter body of request"
        name={"data"}
        theme="dark"
        style={{ display: openTab !== "body" && "none" }}
        className={`w-full rounded-md border overflow-hidden`}
        height="200px"
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
        className="w-full max-h-[40vh] overflow-auto"
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

      <GetCodeDialog selectedRequest={selectedRequest} getCodeRef={getCodeRef} />
    </div>
  );
};

export default RequestSection;

const arrayToObjectFormatter = (array) => {
  return array
    .filter(
      (elm) =>
        elm.key && elm.value && elm.active && elm.key.split(" ").length === 1
    )
    .reduce(
      (currentObj, newElm) => ({
        ...currentObj,
        [newElm.key]: newElm.value,
      }),
      {}
    );
};
