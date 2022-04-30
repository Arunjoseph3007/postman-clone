import { TrashIcon, PlusIcon } from "../public/SVGs";

const defaultRequest = {
  name: "Post Request 50",
  method: "GET",
  data: "",
  url: "",
};

const LeftBar = ({ requestArray, setSelectedIndex, selectedIndex }) => {
  return (
    <div className="w-1/4 h-screen border-r bg-black">
      <h1 className="text-4xl font-bold p-4 first-letter:text-teal-100 border-b-2 border-white">
        POSTMAN
      </h1>
      <ul>
        {requestArray.data.map((elm, i) => (
          <li
            className="py-2 px-3 text-xl capitalize border-b border-white flex items-center justify-between"
            key={i}
          >
            <p className="cursor-pointer" onClick={() => setSelectedIndex(i)}>
              <span className="inline-block p-2 rounded-full bg-gray-600 font-bold">{getMethod(elm.method)}</span> {elm.name}
            </p>
            <button onClick={() => requestArray.remove(i)}>
              <TrashIcon />
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={() => requestArray.push({ ...defaultRequest })}
        className="w-3/4 rounded-full p-4 flex justify-center bg-gray-400 mt-4 mx-auto"
      >
        <PlusIcon />
      </button>
    </div>
  );
};

const getMethod = (method) => {
  switch (method) {
    case "GET":
      return "G";
    case "POST":
      return "PO";
    case "PUT":
      return "PU";
    case "DELETE":
      return "D";
    default:
      return "O";
  }
};

export default LeftBar;
