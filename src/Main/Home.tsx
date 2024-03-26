import LoadingBar from "./LoadingBar/LoadingBar";
import Header from "./Header/Header";
import Main from "./Main";
import "./Home.css";
import sectionsData, { mainData } from "./mainData";
let githubURL = "https://github.com/NCenek2/NCenek2.github.io/tree/main/src";

type HomeProps = {
  percentage: number;
  isLoading: boolean;
};

const Home = ({ percentage, isLoading }: HomeProps) => {
  if (isLoading) {
    return <LoadingBar percentage={percentage} />;
  }

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

export default Home;
