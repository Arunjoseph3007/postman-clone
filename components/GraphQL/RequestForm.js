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
    setMessage("");

    //Ensure valid inputs
    if (!selectedRequest.url) return setMessage("Please Enter URL");

    try {
      selectedRequest.variables && JSON.parse(selectedRequest.variables);
    } catch (e) {
      return setMessage(e.message + " in body");
    }

    //REQUEST
    try {
      setIsLoading(true);

      //Get data for request
      const config = {
        url: selectedRequest.url,
        method: "POST",
        headers: arrayToObjectFormatter(selectedRequest.headers),
        data: {
          // operationName: selectedRequest.name,
          query: selectedRequest.data,
          variables: JSON.parse(selectedRequest.variables),
        },
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
    <div className="text-black p-3">
      {/* Head section */}
      <div className="flex items-center gap-4">
        <input
          value={selectedRequest.name}
          className="bg-transparent flex-1 text-4xl"
          onInput={handleChange}
          name="name"
        />
        {message && <div>Message {message}</div>}
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
          onClick={() => getCodeRef?.current?.showModal()}
        >
          Get Code
        </button>
      </div>

      {/* From sectiom */}
      <form
        onSubmit={handleSubmit}
        className="flex w-full shadow rounded overflow-hidden mt-4"
      >
        <p className="p-1 px-2 text-gray-900 bg-gray-200" type="submit">
          Query
        </p>
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
