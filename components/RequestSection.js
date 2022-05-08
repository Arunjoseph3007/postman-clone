import { useRef, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { json, jsonParseLinter } from "@codemirror/lang-json";
import axios from "axios";
import { EditIcon, ExclamationIcon } from "../public/SVGs";
//https://jsonplaceholder.typicode.com/todos/1

const RequestSection = ({
  setResponse,
  setResponseTime,
  selectedRequest,
  setSelectedRequest,
}) => {
  const nameRef = useRef();
  const [isBody, setIsBody] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ message: "" });

  const handleChange = (e) => {
    setSelectedRequest((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const newHandleChange = (e) => {
    setSelectedRequest((prev) => ({
      ...prev,
      name: e.target.textContent,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedRequest.url)
      return setMessage({ message: "Please Enter URL" });

    try {
      JSON.parse(selectedRequest.data);
    } catch (e) {
      return setMessage({ message: e.message + " in body" });
    }
    
    try {
      JSON.parse(selectedRequest.headers);
    } catch (e) {
      return setMessage({ message: e.message + " in headers" });
    }

    try {
      setIsLoading(true);

      const data = JSON.parse(selectedRequest.data);
      const headers = JSON.parse(selectedRequest.headers);

      const start = new Date().getTime();
      const res = await axios({
        url: selectedRequest.url,
        method: selectedRequest.method,
        data: data,
        headers: headers,
      });
      const end = new Date().getTime();

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
      <div className="flex items-center gap-4">
        <h1
          ref={nameRef}
          className="text-4xl"
          contentEditable={true}
          onBlur={newHandleChange}
          name="name"
        >
          {selectedRequest.name}
        </h1>
        <EditIcon onClick={() => nameRef.current.focus()} />
      </div>
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
      <div className="flex mt-4 justify-between">
        <div>
          <button
            className={`shadow-sm rounded-t-lg p-2 px-4 text-xl ${
              isBody && "bg-gray-200"
            }`}
            onClick={() => setIsBody(true)}
          >
            Body
          </button>
          <button
            className={`shadow-sm rounded-t-lg p-2 px-4 text-xl ${
              !isBody && "bg-gray-200"
            }`}
            onClick={() => setIsBody(false)}
          >
            Headers
          </button>
        </div>
        {message.message && (
          <h1 className="text-md p-2 bg-gray-300 rounded flex items-center gap-2">
            {<ExclamationIcon />} {message.message}
          </h1>
        )}
      </div>
      <CodeMirror
        value={selectedRequest.data}
        placeholder="Enter body of request"
        name={"data"}
        theme="dark"
        style={{ display: !isBody && "none" }}
        className={`w-full rounded-md border overflow-hidden`}
        height="200px"
        extensions={[json()]}
        onChange={(value, v) => {
          setSelectedRequest((prev) => ({ ...prev, data: value }));
        }}
      />
      <CodeMirror
        value={selectedRequest.headers}
        placeholder="Enter headers of request"
        name={"headers"}
        theme="dark"
        style={{ display: isBody && "none" }}
        className={`w-full rounded-md border overflow-hidden `}
        height="200px"
        extensions={[json()]}
        onChange={(value, v) => {
          setSelectedRequest((prev) => ({ ...prev, headers: value }));
        }}
      />
    </div>
  );
};

export default RequestSection;
