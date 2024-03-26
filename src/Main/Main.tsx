import "./Main.css";
import MainSection from "./MainSection/MainSection";
import SubSections from "./SubSections/SubSections";
import Footer from "./Footer/Footer";
import { MainData, SectionData } from "./mainData";

type MainProps = {
  sectionsData: SectionData[];
  mainData: MainData;
  githubURL: string;
};

const Main = ({ sectionsData, mainData, githubURL }: MainProps) => {
  return (
    <main className="main">
      <MainSection mainData={mainData} />
      <SubSections sectionsData={sectionsData} />
      <Footer githubURL={githubURL} />
    </main>
  );
};

export default Main;
