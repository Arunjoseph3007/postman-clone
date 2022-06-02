import { useRef } from "react";
import { TrashIcon, PlusIcon, RequestIcon } from "../public/SVGs";
import InfoModal from "./InfoModal";
import NewRequestModal from "./NewRequestModal";

const defaultRequest = {
  name: "New Reqeust",
  method: "GET",
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
};

const LeftBar = ({ requestArray, setSelectedIndex, selectedIndex }) => {
  const dialogRef = useRef();
  const infoRef = useRef();

  const handleDelete = (index) => {
    if (requestArray.data.length === 1) return;

    if (index === selectedIndex) {
      if (index !== 0) setSelectedIndex((prev) => prev - 1);
      else return;
    }

    if (index < selectedIndex) setSelectedIndex((prev) => prev - 1);

    requestArray.remove(index);
  };

  const addRequest = (req) => {
    requestArray.push(req);
  };

  return (
    <div className="w-1/5 h-screen text-black overflow-x-visible overflow-y-hidden border-r relative">
      <h1
        onClick={() => infoRef.current.showModal()}
        className="text-4xl h-[70px] flex items-center font-light tracking-widest px-4 border-b-2  cursor-pointer"
      >
        CELLO APIs
      </h1>
      <InfoModal dialogRef={infoRef} />
      <div className="overflow-y-scroll overflow-x-visible max-h-[calc(100vh-130px)] pb-40">
        {requestArray.data.map((elm, i) => (
          <div
            className={`group py-2 px-3 text-xl  overflow-x-visible capitalize border-b flex items-center justify-between relative ${
              selectedIndex === i && "bg-gray-300"
            }`}
            key={i}
          >
            <div className="flex gap-2 items-center ">
              <RequestIcon method={elm.method} />
              <p className="cursor-pointer" onClick={() => setSelectedIndex(i)}>
                {elm.name}
              </p>
            </div>
            <button onClick={() => handleDelete(i)}>
              <TrashIcon />
            </button>
            <div className="absolute hidden translate-y-14 translate-x-1/2 z-50 overflow-visible px-2 py-1 text-[.8rem] [line-height:1rem] rounded-md pointer-events-none group-hover:block bg-gray-800 text-white">
              {elm.name} <br />
              METHOD : {elm.method} <br />
              URL : {elm.url}
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => dialogRef.current.showModal()}
        className="w-full h-[60px] absolute bottom-0 inset-x-0 flex items-center justify-center bg-gray-400 mt-4 mx-auto"
      >
        <PlusIcon />
      </button>
      <NewRequestModal dialogRef={dialogRef} addRequest={addRequest} />
    </div>
  );
};

export default LeftBar;
