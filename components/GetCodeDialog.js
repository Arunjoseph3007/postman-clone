import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { CloseIcon } from "../public/SVGs";

const GetCodeDialog = ({ selectedRequest, getCodeRef }) => {
  return (
    <dialog
      className="w-full max-w-2xl rounded-md relative overflow-visible"
      ref={getCodeRef}
    >
      <h1 className="text-2xl capitalize font-bold my-2">Code</h1>
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

const convertToJavascript = (selectedRequest) => {
  if (!selectedRequest.url) return "Please enter url";

  return `import axios from 'axios';

const fetchData = async ()=>{
    
    const data = ${convertJSONToJsObjet(selectedRequest.data)}
    const headers = {header: "new header"};
    
    const response = await axios({
        url : "${selectedRequest.url}",
        method : "${selectedRequest.method}",
        ${selectedRequest.data && "data: data,"}
        ${selectedRequest.headers && "headers : headers,"}
    });
    
    console.log(response.data);
}`;
};

const convertJSONToJsObjet = (data) => {
  return data;
};
