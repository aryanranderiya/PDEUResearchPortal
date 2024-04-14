import * as React from "react";
import {
  ListBoxPagesComponentAdd,
  ListBoxPagesComponentView,
} from "./ComponentSidebarListbox";

import { User, Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import { supabase } from "../pages/Login";

export default function SideBar() {
  // const navigate = useNavigate();

  // const { setAuthenticated } = React.useContext(AuthContext);

  async function signOut() {
    console.log("To be implemented");
    //   const { error } = await supabase.auth.signOut();
    //   if (!error) {
    //     setAuthenticated(false);
    //     navigate("/login");
    //   }
  }

  return (
    <div className="border-small py-2 rounded-small border-default-200 dark:border-default-100 px-6 flex flex-col gap-6 justify-between sidebar">
      <div className="flex justify-between items-center">
        <User
          name="User"
          description={"Designation"}
          avatarProps={{
            src: "https://links.aryanranderiya.com/l/default_user",
            size: "md",
          }}
          className="flex justify-start gap-4"
        />
      </div>

      <ListBoxPagesComponentAdd />

      <ListBoxPagesComponentView />

      <div className="flex flex-col gap-4 justify-end items-end">
        <Button
          color="danger"
          variant="ghost"
          size="sm"
          onClick={() => signOut()}
          className="w-full"
          startContent={<span class="material-symbols-rounded">logout</span>}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
