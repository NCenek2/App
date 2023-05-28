import React from "react";
import { useNavigate } from "react-router";
import "./Home.css";

const SubSections = ({ sectionsData }) => {
  const [data, SetData] = React.useState(sectionsData);
  const navigate = useNavigate();

  const handleNavigate = (link, event) => {
    const ID = event.target.id;
    if (link === "") {
      SetData((prevData) =>
        prevData.map((item) => {
          let newValue = { ...item };
          if (item.title === ID) {
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
    <React.Fragment>
      {data.map((section) => {
        const { title, image, text, link, shown, text2 } = section;
        return (
          <section key={title} className="main-subsection">
            <div className="main-subsection-container">
              <h2 className="subsection-title">{title}</h2>
              <img src={image} alt=""></img>
              <p className="subsection-text">{text}</p>
              <div className={`short-subsection ${shown && "long-subsection"}`}>
                {text2}
              </div>
              <button
                id={title}
                className="btn btn-dark"
                onClick={(event) => handleNavigate(link, event)}
              >
                {shown ? "Less" : "More"}
              </button>
            </div>
          </section>
        );
      })}
    </React.Fragment>
  );
};

export default SubSections;
