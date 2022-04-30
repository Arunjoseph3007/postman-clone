import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { json, jsonParseLinter } from "@codemirror/lang-json";
import axios from "axios";
//https://jsonplaceholder.typicode.com/todos/1

const RequestSection = ({
  setResponse,
  selectedRequest,
  setSelectedRequest,
}) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios(selectedRequest);
      setResponse(res);
    } catch (e) {
      setResponse(e.response);
    }
  };

  if (!selectedRequest) {
    return <div className="w-full h-1/2 border text-black p-3"></div>;
  }

  return (
    <div className="w-full h-1/2 border text-black p-3">
      <form
        onSubmit={handleSubmit}
        className="flex w-full border border-black rounded-xl overflow-hidden"
      >
        <select
          value={selectedRequest.method}
          onInput={(e) =>
            setSelectedRequest((prev) => ({ ...prev, method: e.target.value }))
          }
          className="p-3 text-gray-600 border-r pr-6"
          name="method"
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
        <input
          type="text"
          placeholder="http://example.com"
          className="p-3 text-gray-600 flex-1"
          value={selectedRequest.url}
          onChange={(e) =>
            setSelectedRequest((prev) => ({ ...prev, url: e.target.value }))
          }
        />
        <button className="p-3 text-white bg-black" type="submit">
          SEND
        </button>
      </form>

      <CodeMirror
        value={selectedRequest.data}
        theme="dark"
        className="w-full rounded-md border mt-4 overflow-hidden"
        height="200px"
        extensions={[json()]}
        onChange={(value, v) =>
          setSelectedRequest((prev) => ({ ...prev, data: value }))
        }
      />
    </div>
  );
};

export default RequestSection;
