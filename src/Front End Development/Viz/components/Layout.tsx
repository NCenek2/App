import { Outlet } from "react-router";
import Header from "./Header";
import Alert from "./Alert";

const Layout = () => {
  return (
    <>
      <link rel="stylesheet" href="Viz.css" />
      <link rel="stylesheet" href="VizInit.css" />
      <Header />
      <Alert />
      <Outlet />
    </>
  );
};

export default Layout;
