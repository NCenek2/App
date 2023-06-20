export const mainData = {
  title: "Front End Development",
  text1: `Welcome, to my Front End Development page where I display some
    of my own self-created projects.`,
  text2: `My favorite project at the moment is Wordle. I was disappointed
  that I could only play once per day with the New York Times; therefore,
  I created my own version, which allows users to choose words with four
  to six letters! Not to mention that the logic for the coloring system
  is unique, and I certainly had my own struggles in development.`,
};

// {title: "",
// image: "",
// text: "",
// link: ""}

const sectionsData = [
  {
    title: "Wordle",
    image: "images/wordle.JPG",
    text: `Want to play Wordle more than once a day? You can with my 
    knock off Wordle. If you're tired of 5 letters per word, try 
    4 or 6 letters!`,
    link: "",
    shown: false,
    text2: (
      <div className="generic-subsections">
        <a
          className="btn btn-secondary"
          style={{ width: "150px" }}
          href="https://ncenek2.github.io/wordle/"
          target="_blank"
          rel="noreferrer"
        >
          View Project
        </a>
        <a
          className="btn btn-secondary"
          style={{ width: "150px" }}
          href="https://github.com/NCenek2/NCenek2.github.io/blob/main/src/Front%20End%20Development/Wordle/Wordle.jsx"
          target="_blank"
          rel="noreferrer"
        >
          View Code
        </a>
      </div>
    ),
  },
  {
    title: "Quizlet Cards",
    image: "images/quizlet.JPG",
    text: `Quizlet knock off that allows you to create study cards and 
    check definitions based on correctness!`,
    link: "",
    shown: false,
    text2: (
      <div className="generic-subsections">
        <a
          className="btn btn-secondary"
          style={{ width: "150px" }}
          href="https://ncenek2.github.io/quizlet/"
          target="_blank"
          rel="noreferrer"
        >
          View Project
        </a>
        <a
          className="btn btn-secondary"
          style={{ width: "150px" }}
          href="https://github.com/NCenek2/NCenek2.github.io/blob/main/src/Front%20End%20Development/Quizlet/Quizlet.jsx"
          target="_blank"
          rel="noreferrer"
        >
          View Code
        </a>
      </div>
    ),
  },
  {
    title: "Snake Game",
    image: "images/snake_game.JPG",
    text: "The classic snake game uses WASD as controls. For mobile users, you have to use the buttons at the bottom. What high score can you get??",
    link: "",
    shown: false,
    text2: (
      <div className="generic-subsections">
        <a
          className="btn btn-secondary"
          style={{ width: "150px" }}
          href="https://ncenek2.github.io/snake-game/"
          target="_blank"
          rel="noreferrer"
        >
          View Project
        </a>
        <a
          className="btn btn-secondary"
          style={{ width: "150px" }}
          href="https://github.com/NCenek2/NCenek2.github.io/blob/main/src/Front%20End%20Development/Snake_Game/SnakeGame.jsx"
          target="_blank"
          rel="noreferrer"
        >
          View Code
        </a>
      </div>
    ),
  },
  {
    title: "Fruit Store",
    image: "images/fruit_store.JPG",
    text: `Select fruits and the quantity that you want to buy. 
    Review your order before submitting. Don't worry, you won't 
    get charged for what you buy!`,
    link: "",
    shown: false,
    text2: (
      <div className="generic-subsections">
        <a
          className="btn btn-secondary"
          style={{ width: "150px" }}
          href="https://ncenek2.github.io/fruit-store/"
          target="_blank"
          rel="noreferrer"
        >
          View Project
        </a>
        <a
          className="btn btn-secondary"
          style={{ width: "150px" }}
          href="https://github.com/NCenek2/NCenek2.github.io/blob/main/src/Front%20End%20Development/Fruit%20Store/FruitStore.js"
          target="_blank"
          rel="noreferrer"
        >
          View Code
        </a>
      </div>
    ),
  },
  {
    title: "What is It?",
    image: "images/what-is-it.JPG",
    text: `This game tests your ability to memorize patterns. 
    The more patterns that you get correct, the harder it gets!
    Built using a Queue Data Structure.`,
    link: "",
    shown: false,
    text2: (
      <div className="generic-subsections">
        <a
          className="btn btn-secondary"
          style={{ width: "150px" }}
          href="https://ncenek2.github.io/what-is-it/"
          target="_blank"
          rel="noreferrer"
        >
          View Project
        </a>
        <a
          className="btn btn-secondary"
          style={{ width: "150px" }}
          href="https://github.com/NCenek2/what-is-it/blob/main/index.js"
          target="_blank"
          rel="noreferrer"
        >
          View Code
        </a>
      </div>
    ),
  },
];

export default sectionsData;
