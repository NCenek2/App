export const mainData = {
  title: "Full Stack Projects",
  text1: `Welcome, to my Full Stack Project's Page!`,
  text2: `Currently, I only have one project called Sonix that allows 
  users to create, edit, and interact with posts. Sonix is an application 
  created using the MERN Stack (MongoDB, Express, React, and Node). I no
  longer have this application hosted with Heroku, but have provided a
  video for those who want to see more!`,
};

// {title: "",
// image: "",
// text: "",
// link: ""}

const sectionsData = [
  {
    title: "Sonix",
    image: "images/sonix.JPG",
    text: `Welcome to Sonix! This application allows users to create,
    delete, edit, and react to other users posts. User authentication
    provided by Google OAuth!`,
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
];

export default sectionsData;
