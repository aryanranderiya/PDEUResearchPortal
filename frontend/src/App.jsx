import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { DefaultCards, ResearchForm, BookForm } from "./pages/Home";
import SideBar from "./components/ComponentSidebar";
import { useNavigate } from "react-router-dom";
import AuthContext from "./contexts/AuthContext";
import ThemeContext from "./contexts/ThemeContext";

export default function App() {
  const navigate = useNavigate();
  const { isAuthenticated } = React.useContext(AuthContext);
  const { darkTheme } = React.useContext(ThemeContext);

  React.useEffect(() => {
    if (isAuthenticated) navigate("home");
    else navigate("login");
  }, [isAuthenticated]);

  return (
    <main
      className={`${darkTheme} text-foreground bg-background h-screen w-screen flex overflow-hidden`}
    >
      {isAuthenticated && <SideBar />}
      <Routes>
        <Route path="home">
          <Route index element={<DefaultCards />} />
          <Route
            path="addJournal"
            element={<ResearchForm title="Add Journal Papers" />}
          />
          <Route
            path="addConferenceProceedings"
            element={
              <ResearchForm
                title="Add Conference Proceedings"
                is_conference={true}
              />
            }
          />
          <Route path="addBook" element={<BookForm />} />
        </Route>
        <Route path="login" element={<Login />} />
      </Routes>
    </main>
  );
}
