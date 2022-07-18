import { useRef } from "react";
import { TrashIcon, PlusIcon, RequestIcon } from "../../public/SVGs";
import InfoModal from "../InfoModal";
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
    <div className="w-1/5 h-screen text-black border-r relative flex flex-col resize-x">
      <h1
        onClick={() => infoRef.current.showModal()}
        className="text-3xl bg-gray-100 sticky top-0 flex items-center font-light tracking-widest p-4 border-b-2 z-10"
      >
        CELLO APIs
      </h1>
      <InfoModal dialogRef={infoRef} />
      <div className="flex-1 max-h-screen">
        {requestArray.data.map((elm, i) => (
          <div
            className={`group py-2 px-3 text-xl capitalize border-b flex items-center justify-between relative ${
              selectedIndex === i && "bg-gray-300"
            }`}
            key={i}
          >
            <div className="flex gap-2 items-center">
              <RequestIcon method={elm.method} />
              <p
                className="cursor-pointer flex-1"
                onClick={() => setSelectedIndex(i)}
              >
                {elm.name}
              </p>
            </div>
            <button onClick={() => handleDelete(i)}>
              <TrashIcon />
            </button>
            <div className="absolute w-28 opacity-0 left-full translate-x-2 z-50 px-2 py-1 text-xs rounded-md pointer-events-none group-hover:opacity-[1] text-gray-800 bg-white">
              {elm.name} <br />
              METHOD : {elm.method} <br />
              URL : {elm.url}
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => dialogRef.current.showModal()}
        className="w-full p-4 sticky bottom-0 inset-x-0 flex items-center justify-center bg-gray-400 mx-auto"
      >
        <PlusIcon />
      </button>
      <NewRequestModal dialogRef={dialogRef} addRequest={addRequest} />
    </div>
  );
};

export default LeftBar;
