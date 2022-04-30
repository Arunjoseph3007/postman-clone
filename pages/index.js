import Head from "next/head";
import LeftBar from "../components/LeftBar";
import RequestSection from "../components/RequestSection";
import ResponseSection from "../components/ResponseSection";
import { useState, useEffect, useMemo } from "react";
import { useArray } from "../public/CustomHooks";

export default function Home() {
  const [response, setResponse] = useState();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedRequest, setSelectedRequest] = useState();
  const requestArray = useArray([
    { name: "Sample Request", method: "GET", data: "", url: "" },
    { name: "Post Request", method: "POST", data: "", url: "" },
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
      <Head></Head>
      <div className="h-screen w-full flex bg-gray-100 text-white">
        <LeftBar
          requestArray={requestArray}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
        <div className="w-full h-screen">
          <RequestSection
            setSelectedRequest={setSelectedRequest}
            selectedRequest={selectedRequest}
            setResponse={setResponse}
          />
          <ResponseSection response={response} />
        </div>
      </div>
    </>
  );
}
