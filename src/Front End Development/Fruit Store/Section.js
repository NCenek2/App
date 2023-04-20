import {} from "@testing-library/user-event/dist/utils";

const Section = ({ section, currentSection, handleSection }) => {
  const { name: sectionName } = section;

  return (
    <button
      onClick={() => handleSection(sectionName)}
      className={` btn btn-${
        sectionName === currentSection ? "success" : "secondary"
      } }`}
    >
      {sectionName}
    </button>
  );
};

export default Section;
