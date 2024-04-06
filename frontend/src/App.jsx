import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { DefaultCards, AddFormPage } from "./pages/Home";
import SideBar from "./components/SideBar";
import { useNavigate } from "react-router-dom";
import AuthContext from "./contexts/AuthContext";

export default function App() {
  const navigate = useNavigate();
  const { isAuthenticated } = React.useContext(AuthContext);

  React.useEffect(() => {
    if (isAuthenticated) navigate("home");
    else navigate("login");
  }, [isAuthenticated]);

  return (
    <main className="dark text-foreground bg-background h-screen w-screen flex overflow-hidden">
      {isAuthenticated && <SideBar />}
      <Routes>
        <Route path="home">
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
        <Route path="login" element={<Login />} />
      </Routes>
    </main>
  );
}
