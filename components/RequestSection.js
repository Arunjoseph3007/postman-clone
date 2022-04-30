import { useRef } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { json, jsonParseLinter } from "@codemirror/lang-json";
import axios from "axios";
import { EditIcon } from "../public/SVGs";
//https://jsonplaceholder.typicode.com/todos/1

const RequestSection = ({
  setResponse,
  setResponseTime,
  selectedRequest,
  setSelectedRequest,
}) => {
  const nameRef = useRef();

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
    try {
      const start = new Date().getTime();
      const res = await axios(selectedRequest);
      const end = new Date().getTime();
      setResponseTime(end - start);
      setResponse(res);
    } catch (e) {
      setResponse(e.response);
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
