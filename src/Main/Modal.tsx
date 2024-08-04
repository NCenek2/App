import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ProjectData } from "./projectData";

type ModalData = Omit<ProjectData, "image">;

const initialModalData: ModalData = {
  title: "",
  description: "",
  links: <></>,
};

const Modal = forwardRef(function Modal({}, ref) {
  const dialog = useRef<HTMLDialogElement>(null);

  const [modalData, setModalData] = useState<ModalData>(initialModalData);

  function handleClose() {
    dialog.current?.close();
    setModalData(() => {
      return initialModalData;
    });
  }

  useImperativeHandle(ref, () => {
    return {
      open(title: string, description: string, links: React.JSX.Element) {
        dialog.current?.showModal();

        setModalData((prevData) => {
          return {
            ...prevData,
            title,
            description,
            links,
          };
        });
      },

      close() {
        handleClose();
      },
    };
  });

  return createPortal(
    <dialog className="dialog" ref={dialog}>
      <header className="dialog-header">
        <h1>{modalData.title}</h1>
        <div onClick={handleClose}>X</div>
      </header>
      <p>{modalData.description}</p>
      {modalData.links}
    </dialog>,
    document.getElementById("modal") as HTMLDivElement
  );
});

export default Modal;
