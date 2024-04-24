import { Button, User } from "@nextui-org/react";

export default function Navbar({ sidebarClosed, setsidebarClosed }) {
  return (
    <div className="navbar border-small border-default-200 dark:border-default-100">
      <Button
        size="sm"
        isIconOnly
        variant="light"
        className="navbar_button"
        onPress={() => setsidebarClosed(!sidebarClosed)}
      >
        <span className="material-symbols-rounded">menu</span>
      </Button>

      <img
        src={require("../images/pdeu_logo.png")}
        className="sidebar_logo"
        isBordered
      />
      <span className="navbar_title">PDEU Faculty Research Portal</span>

      <User
        name={"Name"}
        description={"Designation"}
        avatarProps={{
          isBordered: true,
          showFallback: true,
          src: "https://links.aryanranderiya.com/l/default_user",
          size: "md",
        }}
        className="gap-4 navbar_user"
      />
      <Button
        color="danger"
        size="md"
        // onClick={() => signOut()}
        isIconOnly
        variant="flat"
      >
        <span className="material-symbols-rounded">logout</span>
      </Button>
    </div>
  );
}
