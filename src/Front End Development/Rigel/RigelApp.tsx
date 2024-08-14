import React from "react";
import { Outlet, Route, Routes } from "react-router";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Main from "./components/authenticated/Main";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import RequireAuth from "./components/RequireAuth";
import Register from "./components/Register";
import RequireMode from "./components/authenticated/RequireMode";
import DeckProvider from "./contexts/DeckContext";
import CardProvider from "./contexts/CardContext";
import EditFlashCards from "./components/authenticated/EditFlashcards";
import Write from "./components/authenticated/Write";
import StudyCards from "./components/authenticated/StudyCards";

function RigelApp() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route element={<RequireAuth />} path="/main">
            <Route
              element={
                <DeckProvider>
                  <CardProvider>
                    <Outlet />
                  </CardProvider>
                </DeckProvider>
              }
            >
              <Route index element={<Main />} />
              <Route element={<RequireMode />}>
                <Route path="study" element={<StudyCards />} />
                <Route path="edit" element={<EditFlashCards />} />
                <Route path="write" element={<Write />} />
              </Route>
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <div className="star"></div>
    </>
  );
}

export default RigelApp;
