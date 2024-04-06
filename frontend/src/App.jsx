import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { DefaultCards, AddFormPage } from "./pages/Home";
import SideBar from "./components/SideBar";
import { useNavigate } from "react-router-dom";

export default function App() {
  const navigate = useNavigate();

  const [authenticated, setAuthenticated] = React.useState(false);

  React.useEffect(() => {
    const isAuthenticated = localStorage.getItem("authenticated") === "true";
    setAuthenticated(isAuthenticated);
  }, []);

  React.useEffect(() => {
    if (authenticated) navigate("/home");
    else navigate("/login");
  }, [authenticated]);

  if (!authenticated) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    );
  }

  return (
    <main className="dark text-foreground bg-background h-screen w-screen flex overflow-hidden">
      <SideBar />
      <Routes>
        <Route path="/home">
          <Route index element={<DefaultCards />} />
          <Route
            path="addJournal"
            element={<AddFormPage title="Add Journal Papers" />}
          />
          <Route
            path="addConferenceProceedings"
            element={
              <AddFormPage
                title="Add Conference Proceedings"
                is_conference={true}
              />
            }
          />
          <Route path="addPatent" />
        </Route>
      </Routes>
    </main>
  );
}
