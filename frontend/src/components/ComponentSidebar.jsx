import * as React from "react";
import { ListBoxPagesComponentAdd } from "./ComponentSidebarListbox";
import { User, Button, Avatar } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

export default function SideBar({ sidebarClosed }) {
  const navigate = useNavigate();

  const { isAuthenticated, setAuthenticated } = React.useContext(AuthContext);
  const [userAvatarData, setUserAvatarData] = React.useState({
    name: "User",
    profile_photo: "https://links.aryanranderiya.com/l/default_user",
    designation: "",
  });

  async function signOut() {
    setAuthenticated(false);
    navigate("/login");
  }

  React.useEffect(() => {
    const userId = localStorage.getItem("userId");

    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://pdeu-research-portal-api.vercel.app/select",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              table_name: "Employee",
              where: ["id", userId],
            }),
          }
        );

        const jsonData = await response.json();
        setUserAvatarData(jsonData[0]);
      } catch (error) {
        console.error("Error fetching data:", error.message, error);
      }
    };

    fetchData();
  }, [isAuthenticated]);

  return (
    <div
      className={`border-small border-default-200 dark:border-default-100 flex flex-col gap-6 justify-between sidebar h-full ${
        sidebarClosed ? "sidebar_closed" : ""
      }`}
    >
      <div className="flex justify-between items-center px-6 py-2">
        <User
          name={userAvatarData.name}
          description={userAvatarData.designation}
          avatarProps={{
            isBordered: true,
            showFallback: true,
            src: userAvatarData.profile_photo,
            size: "md",
          }}
          className="flex justify-start gap-4"
        />
      </div>

      <ListBoxPagesComponentAdd />

      <div className="flex flex-col gap-4 justify-end items-end px-6 py-2">
        <Button
          color="danger"
          variant="ghost"
          size="md"
          onClick={() => signOut()}
          className="w-full"
          startContent={
            <span className="material-symbols-rounded">logout</span>
          }
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
