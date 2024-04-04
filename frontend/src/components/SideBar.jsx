import * as React from "react";
import ListBoxPagesComponent from "./ListBoxPagesComponent";
import { User, Button } from "@nextui-org/react";
import { signOut } from "../pages/Login";
import { useNavigate } from "react-router-dom";

export default function SideBar() {
  const navigate = useNavigate();

  const SignOutUser = () => {
    signOut().then((response) => {
      navigate("/login");
      localStorage.removeItem("authenticated");
    });
  };

  return (
    <div className=" border-small py-2 rounded-small border-default-200 dark:border-default-100 px-6 flex flex-col gap-6 justify-between">
      <br></br>

      <ListBoxPagesComponent />

      <div className="flex flex-col gap-4">
        <Button
          color="danger"
          variant="ghost"
          size="sm"
          onClick={() => SignOutUser()}
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
