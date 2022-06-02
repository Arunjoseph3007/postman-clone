import { useState } from "react";
import { useEffect } from "react";
import { CloseIcon } from "../public/SVGs";

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

const InfoModal = ({ dialogRef }) => {
  const [deferredPrompt, setDeferredPrompt] = useState();
  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);
  const handleInstall = async (e) => {
    if (typeof window === "undefined") return;

    if (deferredPrompt === null) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      deferredPrompt = null;
    }
  };
  return (
    <dialog
      className="w-full max-w-2xl rounded-md relative overflow-visible"
      ref={dialogRef}
    >
      <h1 className="text-4xl h-[70px] flex items-center font-light tracking-widest border-b-2">
        CELLO APIs
      </h1>
      <hr />
      <div className="my-2 flex flex-col gap-4">
        <h2>
          Cello APIs is an Webapp which can be used to test your backend APIs.
          Similar to Postman it offers almost all the features necesarry. You
          can make get, post, update, delete requests, save seesions for future,
          even interact with APIs running on local server. The advantage of
          using such service over postman is that It beahves exactly how a
          frontend application would making your projects more robust.{" "}
        </h2>
        <hr />
        <h2>
          Hey, Great new!! Cello APIs is now available as Desktop Application
          (PWA).
        </h2>
        <button
          onClick={handleInstall}
          className="bg-black my-3 text-white p-2 px-4 rounded-md"
        >
          Install
        </button>
      </div>
      <form method="dialog">
        <button className="absolute -top-3 -right-3" type="submit">
          <CloseIcon />
        </button>
      </form>
    </dialog>
  );
};

export default InfoModal;
