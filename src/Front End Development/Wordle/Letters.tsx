type LettersProps = { letterCount: number };

const Letters = ({ letterCount }: LettersProps) => {
  const letters = letterCount;
  const letterClass =
    letters == 4 ? "fourInput" : letters == 5 ? "fiveInput" : "sixInput";

  const container = [];
  let i = 0;
  for (let block = 0; block < 6; block++) {
    const section = [];
    const row = Math.floor(i / letters) + 1;
    for (i; i < letters * row; i++) {
      section.push(
        <input
          key={`${i}`}
          id={`i${i}`}
          name={`${row}`}
          className={`${letterClass} wordleTile`}
        />
      );
    }
    container.push(
      <div key={block} className="tile-section">
        {section}
      </div>
    );
  }
  return <div className="tile-container">{container}</div>;
};
export default Letters;
