import * as React from "react";
import ListBoxPagesComponent from "./ListBoxPagesComponent";
import { User, Button } from "@nextui-org/react";
export default function SideBar() {
  return (
    <div className=" border-small py-2 rounded-small border-default-200 dark:border-default-100 px-6 flex flex-col gap-6 justify-between">
      <br></br>

      <ListBoxPagesComponent />

      <div className="flex flex-col gap-4">
        <Button color="danger" variant="ghost" size="sm">
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
