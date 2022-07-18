import { useState } from "react";
import axios from "axios";
import { arrayToObjectFormatter } from "../../public/utils";

const RequestForm = ({
  setResponse,
  setResponseTime,
  selectedRequest,
  saveSession,
  newSession,
  setSelectedRequest,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState();

  const handleChange = (e) => {
    setSelectedRequest((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Ensure valid inputs
    if (!selectedRequest.url) return setMessage("Please Enter URL");

    try {
      selectedRequest.data && JSON.parse(selectedRequest.data);
    } catch (e) {
      return setMessage(e.message + " in body");
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
      console.log(e);
      setResponse(e.response);
      setIsLoading(false);
    }
  };

  if (!selectedRequest) return null;

  return (
    <div className="text-black flex flex-col gap-2 justify-center items-center p-2 h-[15vh]">
      {/* Head section */}
      <div className="flex w-full items-center gap-4">
        <input
          value={selectedRequest.name}
          className="bg-transparent flex-1 text-3xl"
          onInput={handleChange}
          name="name"
        />
        {message && <div>Message {message}</div>}
        <button
          className="bg-black text-white p-1 px-4 self-end rounded-md"
          onClick={saveSession}
        >
          Save Session
        </button>
        <button
          className="bg-black text-white p-1 px-4 self-end rounded-md"
          onClick={newSession}
        >
          New Session
        </button>
        <button
          className="bg-black text-white p-1 px-4 self-end rounded-md"
          onClick={() => getCodeRef?.current?.showModal()}
        >
          Get Code
        </button>
      </div>

      {/* From sectiom */}
      <form
        onSubmit={handleSubmit}
        className="flex w-full shadow rounded overflow-hidden"
      >
        <select
          name="method"
          value={selectedRequest.method}
          onInput={handleChange}
          className="p-1 text-gray-600 border-r pr-3 "
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
          className="px-3 text-gray-600 flex-1"
          value={selectedRequest.url}
          onChange={handleChange}
        />
        <button
          disabled={isLoading}
          className="p-1 px-2 text-white bg-black"
          type="submit"
        >
          {isLoading ? "SENDING.." : "SEND"}
        </button>
      </form>
    </div>
  );
};

export default RequestForm;
