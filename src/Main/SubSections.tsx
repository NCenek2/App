import { useState } from "react";
import { useNavigate } from "react-router";
import "./Home.css";
import { SectionData } from "./mainData";

type SubSectionsProps = {
  sectionsData: SectionData[];
};

const SubSections = ({ sectionsData }: SubSectionsProps) => {
  const [data, SetData] = useState(sectionsData);
  const navigate = useNavigate();

  const handleNavigate = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    link: string
  ) => {
    const { id } = e.currentTarget;
    if (link === "") {
      SetData((prevData) =>
        prevData.map((item) => {
          let newValue = { ...item };
          if (item.title === id) {
            newValue = { ...item, shown: !item.shown };
          }
          return newValue;
        })
      );
      return undefined;
    } else {
      return navigate(link);
    }
  };

  return (
    <>
      {data.map((section) => {
        const { title, image, text, link, shown, text2 } = section;
        return (
          <section key={title} className="main-subsection">
            <div className="main-subsection-container">
              <h2 className="subsection-title">{title}</h2>
              <img src={image} alt=""></img>
              <p className="subsection-text">{text}</p>
              <div className={`${!shown && "show-content"}`}>{text2}</div>
              <button
                id={title}
                className="btn btn-dark"
                onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                  handleNavigate(e, link)
                }
              >
                {shown ? "Less" : "More"}
              </button>
            </div>
          </section>
        );
      })}
    </>
  );
};

export default SubSections;
