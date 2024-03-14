import * as React from "react";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { EyeSlashFilledIcon, EyeFilledIcon } from "../icons";
import { Link } from "react-router-dom";

export default function LoginInputs() {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <>
      <Input
        variant="faded"
        isRequired
        type="email"
        label="Email"
        className="max-w-xs"
        isClearable="true"
      />

      <Input
        variant="faded"
        label="Password"
        isRequired
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
        type={isVisible ? "text" : "password"}
        className="max-w-xs"
      />

      <Link to="/home">
        <Button color="primary" variant="shadow">
          Login
        </Button>
      </Link>
    </>
  );
}
