import "./Home.css";
import { MainData } from "./mainData";

type MainSectionProps = {
  mainData: MainData;
};

const MainSection = ({ mainData }: MainSectionProps) => {
  const { title, text1, text2 } = mainData;
  return (
    <>
      {
        <section className="main-section">
          <div className="main-section-container">
            <h2>{title}</h2>
            <p>{text1}</p>
            <p>{text2}</p>
          </div>
        </section>
      }
    </>
  );
};

export default MainSection;
