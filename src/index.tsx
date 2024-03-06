import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/js/bootstrap.min";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById("root") as HTMLDivElement);
root.render(
  <Router basename="/">
    <App />
  </Router>
);
// import reportWebVitals from "./reportWebVitals";
// import App from "./App";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<Router basename="/"> <App /> </Router>);
// <React.StrictMode>
// </React.StrictMode>
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
