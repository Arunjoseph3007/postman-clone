import Head from "next/head";
import LeftBar from "../components/LeftBar";
import RequestSection from "../components/RequestSection";
import ResponseSection from "../components/ResponseSection";
import { useState, useEffect } from "react";
import { useArray } from "../public/CustomHooks";
//https://jsonplaceholder.typicode.com/todos/1
const defaultArray = ["GET", "POST", "PUT", "DELETE"].map((method) => ({
  name: `${method} Request`,
  method: method,
  data: "",
  url: "",
  headers: [
    { key: "", value: "", active: true },
    { key: "", value: "", active: true },
    { key: "", value: "", active: true },
  ],
  params: [
    { key: "", value: "", active: true },
    { key: "", value: "", active: true },
    { key: "", value: "", active: true },
  ],
}));

export default function Home() {
  const [response, setResponse] = useState();
  const [responseTime, setResponseTime] = useState();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedRequest, setSelectedRequest] = useState();
  const requestArray = useArray(defaultArray);

  const newSession = () => {
    setSelectedRequest(defaultArray[0]);
    requestArray.setData(defaultArray);
    localStorage.removeItem("session");
  };

  useEffect(() => {
    setSelectedRequest(requestArray.data[selectedIndex]);
  }, [selectedIndex]);

  useEffect(() => {
    selectedRequest && requestArray.update(selectedIndex, selectedRequest);
  }, [selectedRequest]);

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem("session"));
    if (!session) return;
    requestArray.setData(session);
    setSelectedRequest(session[selectedIndex]);
  }, []);

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
            saveSession={requestArray.saveSession}
            newSession={newSession}
          />
          <ResponseSection response={response} responseTime={responseTime} />
        </div>
      </div>
    </>
  );
}
