import Head from "next/head";
import LeftBar from "../components/LeftBar";
import RequestSection from "../components/RequestSection";
import ResponseSection from "../components/ResponseSection";
import { useState, useEffect } from "react";
import { useArray } from "../public/CustomHooks";
//https://jsonplaceholder.typicode.com/todos/1

export default function Home() {
  const [response, setResponse] = useState();
  const [responseTime, setResponseTime] = useState();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedRequest, setSelectedRequest] = useState();
  const requestArray = useArray([
    { name: "Get Request", method: "GET", data: "", url: "" },
    { name: "Post Request", method: "POST", data: "", url: "" },
    { name: "Delete Request", method: "DELETE", data: "", url: "" },
    { name: "Put Request", method: "PUT", data: "", url: "" },
  ]);

  useEffect(() => {
    setSelectedRequest(requestArray.data[selectedIndex]);
  }, [selectedIndex]);

  useEffect(() => {
    if (!selectedRequest) return;
    requestArray.update(selectedIndex, selectedRequest);
  }, [selectedRequest]);

  return (
    <>
      <Head>
        <title>Cello APIs</title>
      </Head>
      <div className="h-screen w-full flex bg-gray-100 text-white">
        <LeftBar
          requestArray={requestArray}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
        <div className="w-4/5 h-screen overflow-hidden">
          <RequestSection
            setResponseTime={setResponseTime}
            setSelectedRequest={setSelectedRequest}
            selectedRequest={selectedRequest}
            setResponse={setResponse}
          />
          <ResponseSection response={response} responseTime={responseTime} />
        </div>
      </div>
    </>
  );
}
