export type ProjectData = {
  title: string;
  image: string;
  description: string;
  links: React.JSX.Element;
};

const sectionsData: ProjectData[] = [
  {
    title: "Viz",
    image: "images/VizCover.JPG",
    description: `Viz is a metrics app made for managers and their teams. Managers can input metrics that they want their employees to meet within cycles
    and use these results to foster insightful discussions.`,
    links: (
      <div className="generic-subsections">
        <a
          className="btn btn-outline-light"
          href="https://www.linkedin.com/posts/nicholas-cenek-91ba5b173_webdevelopment-fullstack-pernstack-activity-7157572496601337856-Z5ZA?utm_source=share&utm_medium=member_desktop"
          target="_blank"
          rel="noreferrer"
        >
          Tutorial
        </a>
        <a
          className="btn btn-outline-light"
          href="https://ncenek2.github.io/viz"
          target="_blank"
          rel="noreferrer"
        >
          Test App
        </a>
        <a
          className="btn btn-outline-light"
          href="https://github.com/NCenek2/Viz"
          target="_blank"
          rel="noreferrer"
        >
          View Code
        </a>
      </div>
    ),
  },
  {
    title: "Rigel",
    image: "images/rigel.JPG",
    description: `Rigel is a studying application that allows users to create decks for studying.
    If you want to be prepared for your next exam. Give Rigel a try!`,
    links: (
      <div className="generic-subsections">
        <a
          className="btn btn-outline-light"
          href="https://youtu.be/m1hJ9tIbq3Q"
          target="_blank"
          rel="noreferrer"
        >
          Tutorial
        </a>
        <a
          className="btn btn-outline-light"
          href="https://ncenek2.github.io/rigel"
          target="_blank"
          rel="noreferrer"
        >
          Test App
        </a>
        <a
          className="btn btn-outline-light"
          href="https://github.com/NCenek2/Rigel"
          target="_blank"
          rel="noreferrer"
        >
          View Code
        </a>
      </div>
    ),
  },
  {
    title: "Sonix",
    image: "images/sonix.JPG",
    description: `Sonix was created using the MERN Stack (MongoDB, Express, React, and Node). 
    This social media application allows users to create/ react to other user's 
    posts.`,
    links: (
      <div className="generic-subsections">
        <a
          className="btn btn-outline-light"
          href="https://www.linkedin.com/posts/nicholas-cenek-91ba5b173_hello-all-its-about-that-time-that-i-show-activity-7074516359140835329-LkBs?utm_source=share&utm_medium=member_desktop"
          target="_blank"
          rel="noreferrer"
        >
          Overview
        </a>
        <a
          className="btn btn-outline-light"
          href="https://github.com/NCenek2/Sonix"
          target="_blank"
          rel="noreferrer"
        >
          View Code
        </a>
      </div>
    ),
  },
  {
    title: "Vertigo",
    image: "images/vertigo.JPG",
    description: `Vertigo is adventure game made with Unity and FMOD. Vertigo allowed me to get more in-depth with OOP and
    video game integration.`,
    links: (
      <div className="generic-subsections">
        <a
          className="btn btn-outline-light"
          href="https://www.linkedin.com/posts/nicholas-cenek-91ba5b173_i-figured-that-it-was-time-to-post-my-new-activity-7110759358929477632-KKTa?utm_source=share&utm_medium=member_desktop"
          target="_blank"
          rel="noreferrer"
        >
          Trailer
        </a>
        <a
          className="btn btn-outline-light"
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
    title: "Sockets",
    image: "images/Sockets.png",
    description: `Sockets is an Angular application that utilizes Web Sockets for real-time communication.
    With Sockets, users can join rooms to seperate communication.`,
    links: (
      <div className="generic-subsections">
        <a
          className="btn btn-outline-light"
          href="https://youtu.be/4Td402l0Z94"
          target="_blank"
          rel="noreferrer"
        >
          Tutorial
        </a>
        <a
          className="btn btn-outline-light"
          href="https://github.com/NCenek2/Sockets"
          target="_blank"
          rel="noreferrer"
        >
          Download
        </a>
      </div>
    ),
  },
  {
    title: "Chat App",
    image: "images/chatapp.JPG",
    description: `Chat App is made with WPF (Windows Presentation Application). 
    This project allowed me to learn more about C#, TCP/IP, and the MVVM design pattern`,
    links: (
      <div className="generic-subsections">
        <a
          className="btn btn-outline-light"
          href="https://youtu.be/cTbcoGC5wls"
          target="_blank"
          rel="noreferrer"
        >
          Tutorial
        </a>
        <a
          className="btn btn-outline-light"
          href="https://github.com/NCenek2/ChatApplication"
          target="_blank"
          rel="noreferrer"
        >
          Download
        </a>
      </div>
    ),
  },
  {
    title: "Wordle",
    image: "images/wordle.JPG",
    description: `Wordle is similar to the New York Times version; however, players
    can now choose to play with 4 or 6 letters.`,
    links: (
      <div className="generic-subsections">
        <a
          className="btn btn-outline-light"
          href="https://ncenek2.github.io/wordle/"
          target="_blank"
          rel="noreferrer"
        >
          Play Game
        </a>
        <a
          className="btn btn-outline-light"
          href="https://github.com/NCenek2/NCenek2.github.io/blob/main/src/Front%20End%20Development/Wordle/"
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
    description: `Snake game uses WASD as controls. For mobile users, you can toggle a joystick to play. 
    Snake Game is built using the Linked List data structure.`,
    links: (
      <div className="generic-subsections">
        <a
          className="btn btn-outline-light"
          href="https://ncenek2.github.io/snake-game/"
          target="_blank"
          rel="noreferrer"
        >
          Play Game
        </a>
        <a
          className="btn btn-outline-light"
          href="https://github.com/NCenek2/NCenek2.github.io/blob/main/src/Front%20End%20Development/Snake_Game/"
          target="_blank"
          rel="noreferrer"
        >
          View Code
        </a>
      </div>
    ),
  },
  {
    title: "Projectile Launcher",
    image: "images/launcher.JPG",
    description: `Projectile Launcher is 2D-projectile motion game made with Matlab App Designer. 
    The user inputs a launch angle and velocity to hit the target.`,
    links: (
      <div className="generic-subsections">
        <a
          className="btn btn-outline-light"
          href="https://www.linkedin.com/posts/nicholas-cenek-91ba5b173_ive-had-time-to-put-coding-knowledge-learned-activity-6944690305958907904-0F51?utm_source=share&utm_medium=member_desktop"
          target="_blank"
          rel="noreferrer"
        >
          Tutorial
        </a>
        <a
          className="btn btn-outline-light"
          href="https://github.com/NCenek2/Scripts/tree/main/Matlab"
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
