import Head from "next/head";
import LeftBar from "../components/GraphQL/LeftBar";
import RequestSection from "../components/GraphQL/RequestSection";
import ResponseSection from "../components/GraphQL/ResponseSection";
import { useState, useEffect } from "react";
import { useArray } from "../Hooks/CustomHooks";
import RequestForm from "../components/GraphQL/RequestForm";
import { useHotKeys } from "../Hooks/useHotKeys";
//https://jsonplaceholder.typicode.com/todos/1
const defaultArray = ["Get", "Update", "Delete"].map((method) => ({
  name: `${method} Query`,
  data: "",
  url: "",
  headers: [
    { key: "", value: "", active: true },
    { key: "", value: "", active: true },
    { key: "", value: "", active: true },
  ],
  variables: "{}",
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
    localStorage.removeItem("GraphQL");
  };

  const saveSession = () => {
    requestArray.saveSession("GraphQL");
  };

  useEffect(() => {
    setSelectedRequest(requestArray.data[selectedIndex]);
  }, [selectedIndex]);

  useEffect(() => {
    selectedRequest && requestArray.update(selectedIndex, selectedRequest);
  }, [selectedRequest]);

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem("GraphQL"));
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
