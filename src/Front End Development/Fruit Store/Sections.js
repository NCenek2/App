import React from "react";
import Section from "./Section";

const Sections = ({ sections, sectionOn, handleSection, fruits }) => {
  const [width, setWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleWidthChange = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWidthChange);
    return () => window.removeEventListener("resize", handleWidthChange);
  }, []);

  //

  if (width < 427) {
    let newSections = [...sections];
    if (fruits.filter((fruit) => fruit.selected === true).length === 0) {
      newSections.splice(2, 1);
    }
    return (
      <select
        className="sections-dropdown"
        onChange={(event) => handleSection(event.target.value)}
      >
        {newSections.map((section) => (
          <option key={section.id} value={section.name}>
            {section.name}
          </option>
        ))}
      </select>
    );
  }

  return (
    <section className="sections-container">
      {sections.map((section) => (
        <Section
          key={section.id}
          handleSection={handleSection}
          section={section}
          sectionOn={sectionOn}
          fruits={fruits}
        />
      ))}
    </section>
  );
};

export default Sections;
