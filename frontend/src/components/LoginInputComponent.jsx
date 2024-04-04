import * as React from "react";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { EyeSlashFilledIcon, EyeFilledIcon } from "./icons";
import { Link } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

async function signInWithEmail(user_email, user_password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: user_email,
    password: user_password,
  });

  if (!error) alert("Logged in!");
}

function validateInput(email, password) {
  signInWithEmail(email, password);
}

export default function LoginInputs() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

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
