export const mainData = {
  title: "Matlab",
  text1: `Matlab was the first programming languages that I had learned in college. Most of the code that I wrote
  was used to create graphs to see mechanical system responses based on equations. Although it 
  is glorified for its ability to solve equations, Matlab had a lot of facinating add-ins.`,
  text2: `After taking my first Computer Science course, I was always interested in algorithms that used logical statements and loops. 
    To demonstrate that other knowledge, I created a game to simulate 2D-projectile motion. 
    The user inputs a launch angle and velocity to hit a target. The user gets three chances on each target. If they fail to hit the target 
    within three attempts, they lose. The user can change the difficulty by using 
    the drop-down box to start at level 1 on that respective mode. Each difficulty has 
    10 Levels, and once completed, they will be automatically directed onto a harder 
    difficulty until Hard Mode is completed and the user wins.`,
};
// {title: "",
// image: "",
// text: "",
// link: "",
// shown: false,
// text2: `<div class=matlab-subsections>
// <a class="btn btn-secondary" style="width: 150px;"
// href=""
// target="_blank">View Code</a></div>`}

const sectionsData = [
  {
    title: "Projectile Launcher",
    image: "images/launcher.JPG",
    text: ``,
    link: "",
    shown: false,
    text2: (
      <div className="generic-subsections">
        <a
          className="btn btn-secondary"
          style={{ width: "150px", margin: "0 auto" }}
          href="https://www.linkedin.com/posts/nicholas-cenek-91ba5b173_ive-had-time-to-put-coding-knowledge-learned-activity-6944690305958907904-0F51?utm_source=share&utm_medium=member_desktop"
          target="_blank"
        >
          View Video
        </a>
        <a
          className="btn btn-secondary"
          style={{ width: "150px", margin: "0 auto" }}
          href="https://github.com/NCenek2/Scripts/blob/main/Projectile%20Launcher.m"
          target="_blank"
        >
          View Code
        </a>
      </div>
    ),
  },
];

export default sectionsData;
