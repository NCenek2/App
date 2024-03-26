import Header from "../Main/Header/Header";
import Main from "../Main/Main";
import sectionsData, { mainData } from "./MatlabData";

const Matlab = () => {
  let githubURL = "https://github.com/NCenek2/Scripts/tree/main/Matlab";
  return (
    <>
      <Header />
      <Main
        sectionsData={sectionsData}
        mainData={mainData}
        githubURL={githubURL}
      />
    </>
  );
};

export default Matlab;
