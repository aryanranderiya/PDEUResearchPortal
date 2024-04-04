import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { DefaultCards, AddFormPage } from "./pages/Home";
import SideBar from "./components/SideBar";
import CardComponent from "./components/CardComponent";

export default function App() {
  let pathName = window.location.pathname;
  let arr = pathName.toString().split("/");
  let currentPath = arr[arr.length - 1];

  console.log(currentPath);
  return (
    <main className="dark text-foreground bg-background h-screen w-screen flex">
      {currentPath !== "login" && <SideBar />}
      <Routes>
        <Route path="/home" element={<DefaultCards />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/home/journalpapers"
          element={<AddFormPage type="Journal Papers" />}
        />

        <Route
          path="/home/conferencepapers"
          element={<AddFormPage type="Conference Papers" />}
        />
      </Routes>
    </main>
  );
}
