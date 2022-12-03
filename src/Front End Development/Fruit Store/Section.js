import {} from "@testing-library/user-event/dist/utils";

const Section = ({ section, sectionOn, handleSection }) => {
  return (
    <button
      onClick={() => handleSection(section.name)}
      className={` btn btn-${
        section.name == sectionOn ? "success" : "secondary"
      } }`}
    >
      {section.name}
    </button>
  );
};

export default Section;
