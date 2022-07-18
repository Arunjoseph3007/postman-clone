import { json } from "@codemirror/lang-json";
import CodeMirror from "@uiw/react-codemirror";

const CodeBox = (props) => {
  return (
    <CodeMirror
      {...props}
      theme="dark"
      className="w-full border"
      height="79.5vh"
      extensions={[json()]}
    />
  );
};

export default CodeBox;
