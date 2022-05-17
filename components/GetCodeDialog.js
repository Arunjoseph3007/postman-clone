import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { CloseIcon } from "../public/SVGs";
import { arrayToObjectFormatter } from "../public/utils";

const GetCodeDialog = ({ selectedRequest, getCodeRef }) => {
  return (
    <dialog
      className="w-full max-w-2xl rounded-md relative overflow-visible"
      ref={getCodeRef}
    >
      <div className="flex">
        <h1 className="text-2xl capitalize font-bold my-2 flex-1">Code</h1>
        <button
          className="bg-black text-white p-2 px-4 self-end rounded-md"
          onClick={() =>
            navigator.clipboard.writeText(convertToJavascript(selectedRequest))
          }
        >
          Copy Code
        </button>
      </div>
      <hr className="my-2" />
      <CodeMirror
        value={convertToJavascript(selectedRequest)}
        theme="dark"
        readOnly
        className={`w-full rounded-md border overflow-hidden`}
        height="310px"
        extensions={[javascript()]}
      />
      <form method="dialog">
        <button className="absolute -top-3 -right-3" type="submit">
          <CloseIcon />
        </button>
      </form>
    </dialog>
  );
};

export default GetCodeDialog;

const convertToJavascript = ({ url, data, headers, params, method }) => {
  if (!url) return "Please enter url";

  const headersArray = JSON.stringify(arrayToObjectFormatter(headers));
  const paramsArray = JSON.stringify(arrayToObjectFormatter(params));

  return `import axios from 'axios';

const fetchData = async ()=>{
    
    ${data && `const data = ${convertJSONToJsObjet(data)}`}
    ${
      headersArray &&
      `const headers = ${convertJSONToJsObjetNew(headersArray)};`
    }
    ${paramsArray && `const params = ${convertJSONToJsObjetNew(paramsArray)};`}
    
    const response = await axios({
        url : "${url}",
        method : "${method}",
        ${data && "data: data,"}
        ${headers && "headers : headers,"}
    });
    
    return response.data;
}`;
};

const convertJSONToJsObjet = (data) => data.split("\n").join("\n    ");

const convertJSONToJsObjetNew = (data) =>
  JSON.stringify(JSON.parse(data), null, 2).split("\n").join("\n    ");
