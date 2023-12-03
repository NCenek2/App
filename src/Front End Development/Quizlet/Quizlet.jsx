import React, { useContext } from "react";
import QuizletContext, { QuizletProvider } from "./QuizletProvider";
import "./Quizlet.css";
import Decks from "./Decks";
import EditFlashCards from "./EditFlashcards";
import StudyCards from "./StudyCards";
import Write from "./Write";

const Quizlet = () => {
  const { editSelected, studySelected, quizSelected } =
    useContext(QuizletContext);

  return (
    <main className="quizlet-container">
      {editSelected ? (
        <EditFlashCards />
      ) : studySelected ? (
        <StudyCards />
      ) : quizSelected ? (
        <Write />
      ) : (
        <Decks />
      )}
    </main>
  );
};

export default Quizlet;
