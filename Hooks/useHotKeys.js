import { useEffect } from "react";

export const useHotKeys = (event, callback) => {
  useEffect(() => {
    const func = (e) => {
      console.log(e);
    };
    document.addEventListener("keypress", func);

    return document.removeEventListener("keypress", func);
  }, []);
};
