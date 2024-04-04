import * as React from "react";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { EyeSlashFilledIcon, EyeFilledIcon } from "./icons";
import { signInWithEmail, supabase } from "../pages/Login";
import { useNavigate } from "react-router-dom";

export default function LoginInputs() {
  const navigate = useNavigate();
  
  const [isVisible, setIsVisible] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function validateInput(email, password) {
    if (signInWithEmail(email, password)) {
      supabase.auth.onAuthStateChange((event) => {
        if (event == "SIGNED_IN") {
          navigate("/home");
        }
      });
    }
  }

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
        value={email}
        onValueChange={(e) => setEmail(e)}
      />

      <Input
        variant="faded"
        label="Password"
        isRequired
        type={isVisible ? "text" : "password"}
        className="max-w-xs"
        value={password}
        onValueChange={(e) => setPassword(e)}
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
      />

      {/* <Link to="/home"></Link> */}

      <Button
        color="primary"
        variant="shadow"
        type="submit"
        onClick={() => validateInput(email, password)}
      >
        Login
      </Button>
    </>
  );
}
