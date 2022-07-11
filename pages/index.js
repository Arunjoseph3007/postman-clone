import Head from "next/head";
import LeftBar from "../components/REST/LeftBar";
import RequestSection from "../components/REST/RequestSection";
import ResponseSection from "../components/REST/ResponseSection";
import { useState, useEffect } from "react";
import { useArray } from "../Hooks/CustomHooks";
import RequestForm from "../components/REST/RequestForm";
import { useHotKeys } from "../Hooks/useHotKeys";
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
    requestArray.setData(defaultArray);
    setSelectedIndex(0);
    setSelectedRequest(defaultArray[0]);
    localStorage.removeItem("REST");
  };

  const saveSession = () => {
    requestArray.saveSession("REST");
  };

  useEffect(() => {
    setSelectedRequest(requestArray.data[selectedIndex]);
  }, [selectedIndex]);

  useEffect(() => {
    selectedRequest && requestArray.update(selectedIndex, selectedRequest);
  }, [selectedRequest]);

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem("REST"));
    if (!session) return;
    requestArray.setData(session);
    setSelectedRequest(session[selectedIndex]);
  }, []);

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
          setSelectedRequest={setSelectedRequest}
        />
        <div className="w-full h-screen overflow-auto  border-1 border-red-500">
          <RequestForm
            selectedRequest={selectedRequest}
            setSelectedRequest={setSelectedRequest}
            setResponse={setResponse}
            setResponseTime={setResponseTime}
            newSession={newSession}
            saveSession={saveSession}
          />
          <div className="flex  border-1 border-red-500">
            <RequestSection
              setSelectedRequest={setSelectedRequest}
              selectedRequest={selectedRequest}
            />
            <ResponseSection response={response} responseTime={responseTime} />
          </div>
        </div>
      </div>
    </>
  );
}
