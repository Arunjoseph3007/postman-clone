import LeftBar from "../components/REST/LeftBar";
import RequestSection from "../components/REST/RequestSection";
import RequestForm from "../components/REST/RequestForm";
import ResponseSection from "../components/ResponseSection";
import Head from "next/head";
import { useState, useEffect } from "react";
import { useArray } from "../Hooks/CustomHooks";
import SplitPane from "react-split-pane";

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
        <div className="w-full h-screen overflow-hidden">
          <RequestForm
            selectedRequest={selectedRequest}
            setSelectedRequest={setSelectedRequest}
            setResponse={setResponse}
            setResponseTime={setResponseTime}
            newSession={newSession}
            saveSession={saveSession}
          />
          <SplitPane split="vertical" minSize={"20%"}>
            <RequestSection
              minSize={"25%"}
              setSelectedRequest={setSelectedRequest}
              selectedRequest={selectedRequest}
              />
            <ResponseSection 
              minSize={"25%"}
              response={response} 
              responseTime={responseTime} 
            />
          </SplitPane>
        </div>
      </div>
    </>
  );
}
