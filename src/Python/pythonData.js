export const mainData = {
  title: "Python",
  image: "images/python_main.JPEG",
  text1:
    " Python was one of the first programming languages that I had learned, aside from MATLAB, a programming language primarily used for engineers. When I started learning Python, I was interested in creating games. Consequently, I created a Turtle Race game. Then, I started going through FreeCodeCamp's Curriculum to learn more of the basics of Scientific Computing. Listed below are some of the projects that I have created.",
  text2: "",
};

// {title: "",
// image: "",
// text: "",
// link: "",
// shown: false,
// text2: `<div class=python-subsections>
// <a class="btn btn-secondary" style="width: 150px; margin: 0 auto"
// href=""
// target="_blank">View Code</a></div>`}

const sectionsData = [
  {
    title: "Turtle Race",
    image: "images/turtle_race.JPG",
    text: "The user attempts to collect the ball before the opponent turtle does. First to 10 wins! It's more difficult than you think.",
    link: "",
    shown: false,
    text2: `<div class=python-subsections><p>
    The opponent turtle is programmed to always move in the closest
    direction to the ball. If the ball is on a diagonal, the turtle is
    slow; however, if the ball lies on a straight line path from the
    opponent turtle, it is fast.
  </p>
  <ul>
    Controls:
    <li>WASD to move.</li>
    <li>Space Bar will allow your turtle to teleport to the center.</li>
  </ul>
<a class="btn btn-secondary" style="width: 150px; margin: 0 auto" 
href="https://github.com/NCenek2/PythonScripts/blob/1d4253619df1cae3cee61246d3568ea577c534dd/TurtleRace.py" 
target="_blank">View Code</a></div>`,
  },
  {
    title: "Arithmetric Formatter",
    image: "images/arithmetric_formatter.JPG",
    text: "This project allows a user to input equations as a list of strings, and the output will be printed to the console in a vertical format.",
    link: "",
    shown: false,
    text2: `<div class=python-subsections>
  <ol>
    Rules:
    <li>The length of the list of strings is limited to 5.</li>
    <li>Operator has to be + or -.</li>
    <li>Numbers can only contain digits, no decimals.</li>
    <li>Numbers cannot be more than four digits.</li>
  </ol>
  <ol>
    Arguments:
    <li>List of Strings.</li>
    <li>
      Boolean. By default it is False. Answers will only display if set
      to True.
    </li>
  </ol>
  <a class="btn btn-secondary" style="width: 150px; margin: 0 auto" 
  href="https://github.com/NCenek2/PythonScripts/blob/1d4253619df1cae3cee61246d3568ea577c534dd/Arithmetic_Formatter.py" 
  target="_blank">View Code</a>
  </div>`,
  },
  {
    title: "Budget Calculator",
    image: "images/budget_calculator.JPG",
    text: 'This project allows the user to create instances of a category Class. From these categories, the user can deposit, withdraw, and transer money from one "account" to another to manage their budget.',
    link: "",
    shown: false,
    text2: `<div class=python-subsections>
  <ol>
    Methods:
    <li>Deposit: deposits money into a category with a description.</li>
    <li>Withdraw: withdraws money from the category.</li>
    <li>Get Balance: returns current balance of category.</li>
    <li>
      Transer: transfers money from a current category to another.
    </li>
    <li>
      Check Funds: checks to see if the value inputted is currently left
      in the account.
    </li>
  </ol><a class="btn btn-secondary" style="width: 150px; margin: 0 auto" 
  href="https://github.com/NCenek2/PythonScripts/blob/1d4253619df1cae3cee61246d3568ea577c534dd/Budget%20Calculator.py" 
  target="_blank">View Code</a>
  </div>`,
  },
  {
    title: "Polygon Area Calculator",
    image: "images/polygon_area_calculator.JPG",
    text: "This project allows a user to set the width and height of a rectangle. From these inputs, the user can output basic properties, such as area, perimeter, and shape.",
    link: "",
    shown: false,
    text2: `<div class=python-subsections>
  <ol>
    Methods:
    <li>Set Width: sets the width of the rectangle.</li>
    <li>Set Height: sets the width of the rectangle.</li>
    <li>Get Area: returns the area based on width and height.</li>
    <li>
      Get Perimeter: returns the perimeter based on width and height.
    </li>
    <li>Get Diagonal: returns the diagonal length.</li>
    <li>Get Picture: outputs the shape in the console.</li>
    <li>
      Get Amount Inside: returns number of times the inputted shape
      could fit within original shape.
    </li>
  </ol><a class="btn btn-secondary" style="width: 150px; margin: 0 auto" 
  href="https://github.com/NCenek2/PythonScripts/blob/1d4253619df1cae3cee61246d3568ea577c534dd/Polygon%20Area%20Calculator.py" 
  target="_blank">View Code</a>
  </div>`,
  },
  {
    title: "Probability Calculator",
    image: "images/probability_calculator.JPG",
    text: 'This project allows users to put colored marbles in a "hat" to find the proability of picking a specified arrangement of marbles given an amount drawn and a number of attempts.',
    link: "",
    shown: false,
    text2: `<div class=python-subsections>
  <p>
  Instantiating the Object: The user can choose the colors and values.
  </p>
  <ol>
    Arguments:
    <li>A hat object.</li>
    <li>Expected Balls as a object literal (dictionary).</li>
    <li>Number of Balls Drawn.</li>
    <li>Number of Experiments.</li>
  </ol><a class="btn btn-secondary" style="width: 150px; margin: 0 auto" 
  href="https://github.com/NCenek2/PythonScripts/blob/main/Probability%20Calculator.py" 
  target="_blank">View Code</a>
  </div>`,
  },
  {
    title: "Time Calculator",
    image: "images/time_calculator.JPG",
    text: "This project allows a user to pick a time and a hour difference. The console will then output the resulting time and day.",
    link: "",
    shown: false,
    text2: `<div class=python-subsections>
  <ol>
    Arguments:
    <li>The time in either AM or PM.</li>
    <li>The time difference seperated by a color (hour:minutes).</li>
    <li>Optional: The starting day.</li>
  </ol><a class="btn btn-secondary" style="width: 150px; margin: 0 auto" 
  href="https://github.com/NCenek2/PythonScripts/blob/main/Time%20Calculator.py" 
  target="_blank">View Code</a>
  </div>`,
  },
];

export default sectionsData;
