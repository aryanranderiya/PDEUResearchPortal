import * as React from "react";
import { Button } from "@nextui-org/react";

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
    </div>
  );
}
