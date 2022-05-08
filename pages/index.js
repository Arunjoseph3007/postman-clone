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
  const requestArray = useArray(
    ["GET", "POST", "PUT", "DELETE"].
    map((method) => ({
      name: `${method} Request`,
      method: method,
      data: "",
      url: "",
      headers: "",
    }))
  );

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
      <div className="h-screen w-full flex bg-gray-100 text-white overflow-hidden">
        <LeftBar
          requestArray={requestArray}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
        <div className="w-4/5 h-screen overflow-auto">
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
