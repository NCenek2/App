export const mainData = {
  title: "Welcome",
  text1: `Hello, my name is Nicholas Cenek. I am an enthusistic 
  programmer who enjoys learning and applying the skills that I have 
  learned into beneficial, real-life projects. This website is ALL 
  self-created, and has been inspired by the passion that I have for 
  software engineering. Recently, I have created a 2D game with Unity called
  Vertigo! I am learning more about C# and the .NET framework to build my next
  application!`,
  text2: `I originally had all my projects split into different categories,
  but have since decided to break all my most important/ favorite projects together on this page.
  I have another section that describes my first programming game created with Matlab.
  Thanks for visiting, and I hope you enjoy!`,
};

const sectionsData = [
  {
    title: "Sonix",
    image: "images/sonix.JPG",
    text: `Sonix was created using the MERN Stack (MongoDB, Express, React, and Node). 
    This application allows users to create, delete, edit, and react to other users 
    posts. User authentication provided by Google OAuth!`,
    link: "",
    shown: false,
    text2: (
      <div className="generic-subsections">
        <a
          className="btn btn-secondary"
          style={{ width: "150px" }}
          href="https://www.linkedin.com/posts/nicholas-cenek-91ba5b173_hello-all-its-about-that-time-that-i-show-activity-7074516359140835329-LkBs?utm_source=share&utm_medium=member_desktop"
          target="_blank"
          rel="noreferrer"
        >
          Watch Video
        </a>
      </div>
    ),
  },
  {
    title: "Vertigo",
    image: "images/vertigo.JPG",
    text: `Vertigo is made with Unity and FMOD. This project allowed me to get more in-depth with Object Oriented Programming with 
    C#, video game integration, as well as an introduction to the capabilities of the .NET framework.`,
    link: "",
    shown: false,
    text2: (
      <div className="generic-subsections">
        <a
          className="btn btn-secondary"
          style={{ width: "150px" }}
          href="https://www.linkedin.com/posts/nicholas-cenek-91ba5b173_i-figured-that-it-was-time-to-post-my-new-activity-7110759358929477632-KKTa?utm_source=share&utm_medium=member_desktop"
          target="_blank"
          rel="noreferrer"
        >
          Watch Video
        </a>
        <a
          className="btn btn-secondary"
          style={{ width: "150px" }}
          href="https://github.com/NCenek2/UnityGames"
          target="_blank"
          rel="noreferrer"
        >
          Download
        </a>
      </div>
    ),
  },
  {
    title: "Quizlet Clone",
    image: "images/quizlet.JPG",
    text: `Quizlet knock off that allows you to create study cards and check definitions based on correctness!`,
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
    text: `The classic snake game uses WASD as controls. For mobile users, you can toggle a joystick to play. 
    Built using a Linked List data structure.`,
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
    title: "Wordle",
    image: "images/wordle.JPG",
    text: `Want to play Wordle more than once a day? You can with my knock off Wordle. If you're tired of
    5 letters per word, try 4 or 6 letters!`,
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
    title: "Matlab",
    image: "images/matlab_subsection.JPG",
    text: 'Learn more about the first "programming language" that sparked my interest into the coding world!',
    link: "/matlab",
    shown: false,
    text2: "",
  },
];

export default sectionsData;
