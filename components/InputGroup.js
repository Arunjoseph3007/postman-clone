import { TrashIcon } from "../public/SVGs";

const InputGroup = ({
  object,
  index,
  name,
  setSelectedRequest,
  selectedRequest,
}) => {

  const handleArrayChange = (e, parameter, i) => {
    const field = e.target.name;
    const fieldArray = selectedRequest[field];

    setSelectedRequest((prev) => ({
      ...prev,
      [field]: [
        ...fieldArray.slice(0, i),
        { ...fieldArray[i], [parameter]: e.target.value },
        ...fieldArray.slice(i + 1, fieldArray.length),
      ],
    }));
  };

  const handleArrayToggle = (e, i) => {
    const field = e.target.name;
    const fieldArray = selectedRequest[field];

    setSelectedRequest((prev) => ({
      ...prev,
      [field]: [
        ...fieldArray.slice(0, i),
        { ...fieldArray[i], active: e.target.checked },
        ...fieldArray.slice(i + 1, fieldArray.length),
      ],
    }));
  };

  const handleArrayDelete = (i) => {
    const field = name;
    const fieldArray = selectedRequest[field];
    setSelectedRequest((prev) => ({
      ...prev,
      [name]: [
        ...fieldArray.slice(0, i),
        ...fieldArray.slice(i + 1, fieldArray.length),
      ],
    }));
  };

  return (
    <div className={`w-full flex items-center bg-white border-b`}>
      <input
        className="mx-4 bg-black accent-gray-900"
        type="checkbox"
        name={name}
        checked={object.active}
        onChange={(e) => handleArrayToggle(e, index)}
      />
      <input
        className="flex-1 border-x p-3 text-xl "
        type="text"
        name={name}
        placeholder="Key"
        value={object.key}
        onChange={(e) => handleArrayChange(e, "key", index)}
      />
      <input
        className="flex-1 border-x p-3 text-xl "
        type="text"
        name={name}
        placeholder="Value"
        value={object.value}
        onChange={(e) => handleArrayChange(e, "value", index)}
      />
      <button onClick={() => handleArrayDelete(index)} className="mx-4">
        <TrashIcon />
      </button>
    </div>
  );
};

export default InputGroup;
