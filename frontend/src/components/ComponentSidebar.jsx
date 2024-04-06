import * as React from "react";
import ListBoxPagesComponent from "./ComponentSidebarListbox";
import { User, Button, Switch } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import ThemeContext from "../contexts/ThemeContext";
import AuthContext from "../contexts/AuthContext";
import { supabase } from "../pages/Login";
import { SunIcon, MoonIcon } from "./Icons";

export default function SideBar() {
  const navigate = useNavigate();

  const { setAuthenticated } = React.useContext(AuthContext);
  const { darkTheme, setDarkTheme } = React.useContext(ThemeContext);
  const [isSelected, setIsSelected] = React.useState(false);

  React.useEffect(() => {
    if (isSelected === true) setDarkTheme("dark");
    else setDarkTheme("light");
  }, [isSelected]);

  React.useEffect(() => {
    if (darkTheme === "dark") setIsSelected(true);
    else setIsSelected(false);
  }, []);

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setAuthenticated(false);
      navigate("/login");
    }
  }

  return (
    <div className=" border-small py-2 rounded-small border-default-200 dark:border-default-100 px-6 flex flex-col gap-6 justify-between">
      <User
        name="Test User"
        description={"Head of Department"}
        avatarProps={{
          src: "https://avatars.githubusercontent.com/u/64796509?v=4",
        }}
        className="flex justify-start"
      />

      <ListBoxPagesComponent />

      <div className="flex flex-col gap-4 justify-end items-end">
        <Switch
          isSelected={isSelected}
          onValueChange={(e) => setIsSelected(e)}
          size="md"
          startContent={<SunIcon />}
          endContent={<MoonIcon />}
        ></Switch>

        <Button
          color="danger"
          variant="ghost"
          size="sm"
          onClick={() => signOut()}
          className="w-full"
        >
          Log Out
        </Button>
      </div>
    </div>
  );
}
