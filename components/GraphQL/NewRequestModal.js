import { useState } from "react";
import { CloseIcon } from "../../public/SVGs";

const defaultRequest = {
  name: "New Reqeust",
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

const NewRequestModal = ({ dialogRef, addRequest }) => {
  const [newRequest, setNewRequest] = useState(defaultRequest);

  const handleChange = (e) => {
    setNewRequest((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addRequest(newRequest);
    dialogRef.current.close();
  };
  return (
    <dialog
      className="w-full max-w-2xl rounded-md relative overflow-visible"
      ref={dialogRef}
    >
      <h1 className="text-4xl h-[70px] flex items-center font-light tracking-wide border-b-2">
        Add New Request
      </h1>
      <hr />
      <form className="mt-2" onSubmit={handleSubmit}>
        <div className="w-full flex my-1 items-center justify-between">
          <label className="my-2 text-xl">Name</label>
          <input
            onChange={handleChange}
            className="w-3/4 p-1 border"
            type="text"
            placeholder="Enter Name"
            name="name"
            value={newRequest.name}
          />
        </div>
        <div className="w-full flex my-1 items-center justify-between">
          <label className="my-2 text-xl">URL</label>
          <input
            onChange={handleChange}
            className="w-3/4 p-1 border"
            type="text"
            placeholder="Enter URL"
            name="url"
            value={newRequest.url}
          />
        </div>

        <button
          type="submit"
          className="bg-black my-3 text-white p-2 px-4 rounded-md"
        >
          Add
        </button>
      </form>
      <form method="dialog">
        <button className="absolute -top-3 -right-3" type="submit">
          <CloseIcon />
        </button>
      </form>
    </dialog>
  );
};

export default NewRequestModal;
