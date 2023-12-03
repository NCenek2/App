import Quizlet from "./Quizlet";
import { QuizletProvider } from "./QuizletProvider";

const QuizletWrapper = () => {
  return (
    <QuizletProvider>
      <Quizlet />
    </QuizletProvider>
  );
};

export default QuizletWrapper;
