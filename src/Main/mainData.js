export const mainData = {
  title: "Welcome",
  text1: `Hello, my name is Nicholas Cenek. I am an enthusistic 
  programmer who enjoys learning and applying the skills that I have 
  learned into beneficial, real-life projects. This website is ALL 
  self-created, and has been inspired by the passion that I have for 
  web development. Currently, I am in the process of refactoring 
  code and updating this portfolio to include my first Full Stack 
  Application called Sonix!`,
  text2: `I have categorized my knowledge and skills into three areas: 
    Front End Development, Full Stack Projects, and Python. Additionally,
    I have another section that describes my first programming game created with Matlab.
    Thanks for visiting, and I hope you enjoy!`,
};

const sectionsData = [
  {
    title: "Front End Development",
    image: "images/frontend_subsection.JPG",
    text: "Explore some of my favorite projects with HTML, CSS, JS, and React.",
    link: "/front-end-development",
    shown: false,
    text2: "",
  },
  {
    title: "Full Stack Projects",
    image: "images/sonix.JPG",
    text: `View my full-stack projects that move away from only UI interfaces and dive 
    into server routing and data handling.`,
    link: "/full-stack-development",
    shown: false,
    text2: "",
  },
  {
    title: "Python",
    image: "images/python_subsection.JPG",
    text: "Learn more about my python projects, which demonstrates the use of object-oriented programming.",
    link: "/python",
    shown: false,
    text2: "",
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
