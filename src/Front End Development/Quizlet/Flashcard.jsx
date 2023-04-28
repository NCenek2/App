import React from "react";

const Flashcard = ({ id, term, definition }) => {
  return (
    <article>
      <h2>{term}</h2>
      <p>{definition}</p>
    </article>
  );
};

export default Flashcard;
{
  /* <Flashcard
    key={index}
    id={index}
    term={term}
    definition={definition}
  /> */
}
