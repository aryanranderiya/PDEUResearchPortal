import * as React from "react";
import ListBoxPagesComponent from "./ListBoxPagesComponent";
import { User, Button, Switch } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import ThemeContext from "../contexts/ThemeContext";
import AuthContext from "../contexts/AuthContext";
import { supabase } from "../pages/Login";

export default function SideBar() {
  const navigate = useNavigate();

  const [isSelected, setIsSelected] = React.useState(
    localStorage.getItem("dark_mode") || true
  );

  // React.useEffect(() => {
  //   localStorage.setItem("dark_mode", isSelected);
  // }, [isSelected]);

  const { isAuthenticated, setAuthenticated } = React.useContext(AuthContext);

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setAuthenticated(false);
      navigate("/login");
    }
  }

  return (
    <div className=" border-small py-2 rounded-small border-default-200 dark:border-default-100 px-6 flex flex-col gap-6 justify-between">
      <br></br>

      <Switch isSelected={isSelected} onValueChange={(e) => setIsSelected(e)}>
        Theme
      </Switch>

      <ListBoxPagesComponent />

      <div className="flex flex-col gap-4">
        <Button
          color="danger"
          variant="ghost"
          size="sm"
          onClick={() => signOut()}
        >
          Log Out
        </Button>

        <User
          name="Test User"
          description={"Head of Department"}
          avatarProps={{
            src: "https://avatars.githubusercontent.com/u/64796509?v=4",
          }}
          className="self-end"
        />
      </div>
    </div>
  );
}
