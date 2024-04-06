import * as React from "react";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { EyeSlashFilledIcon, EyeFilledIcon } from "./icons";
import { supabase } from "../pages/Login";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

export default function LoginInputs() {
  const navigate = useNavigate();

  const [isVisible, setIsVisible] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { isAuthenticated, setAuthenticated } = React.useContext(AuthContext);

  async function signInWithEmail(user_email, user_password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: user_email,
      password: user_password,
    });

    if (!error) {
      setAuthenticated(true);
      if (isAuthenticated === true) navigate("/home");
    }
  }

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
            onClick={() => setIsVisible(!isVisible)}
          >
            {isVisible ? (
              <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
      />

      <Button
        color="primary"
        variant="shadow"
        type="submit"
        onClick={() => signInWithEmail(email, password)}
      >
        Login
      </Button>
    </>
  );
}
