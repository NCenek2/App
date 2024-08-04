import "./Home.css";
import sectionsData from "./projectData";
import { useRef, useState } from "react";
import Modal from "./Modal";

export type ModalType = HTMLDialogElement & {
  open: (title: string, description: string, jsx: React.JSX.Element) => void;
  close: () => void;
};

const Home = () => {
  const modalRef = useRef<ModalType>(null);
  const [projects, setProjects] = useState(sectionsData);

  function handleProjectSelect(
    title: string,
    description: string,
    links: React.JSX.Element
  ) {
    console.log(title);
    setProjects((prevProjects) => prevProjects);

    if (modalRef.current) {
      modalRef.current.open(title, description, links);
    }
  }

  return (
    <>
      <Modal ref={modalRef} />
      <div className="banner">
        <div
          className="slider"
          style={
            {
              "--quantity": sectionsData.length,
              animation: "autoRun 30s linear infinite",
            } as React.CSSProperties
          }
        >
          {projects.map((sectionData, index) => {
            const { image, title, description, links } = sectionData;
            return (
              <div
                onClick={() => handleProjectSelect(title, description, links)}
                key={title}
                className="item"
                style={{ "--position": index + 1 } as React.CSSProperties}
              >
                <img src={image} alt="" />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
