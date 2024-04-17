import * as React from "react";
import SelectComponent from "../components/ComponentLoginSelect";
import ThemeContext from "../contexts/ThemeContext";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import { EyeSlashFilledIcon, EyeFilledIcon } from "../components/icons";
import { Input, Button } from "@nextui-org/react";

export default function Login() {
  const { darkTheme } = React.useContext(ThemeContext);

  const navigate = useNavigate();
  const { isAuthenticated, setAuthenticated } = React.useContext(AuthContext);
  const [isVisible, setIsVisible] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const validateEmail = (email) =>
    email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);

  const isInvalid = React.useMemo(() => {
    if (email === "") return false;

    return validateEmail(email) ? false : true;
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://pdeu-research-portal-api.vercel.app/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email, password: password }),
        }
      );

      const responseJson = await response.json();

      if (!response.ok) throw new Error(responseJson.error);
      console.log("Successfully Logged in!");
      setAuthenticated(true);

      localStorage.setItem("userId", responseJson.user.id);

      if (isAuthenticated === true) navigate("/home");
    } catch (error) {
      console.error("Error posting data:", error.message);
      alert(error);
    }
  };

  return (
    <>
      <main>
        <form
          method="post"
          onSubmit={handleSubmit}
          className={`${darkTheme} text-foreground bg-background text-center flex justify-center gap-4 h-screen items-center flex-col w-screen`}
        >
          <SelectComponent />
          <Input
            variant="faded"
            isRequired
            type="email"
            label="Email"
            className="max-w-xs"
            isClearable="true"
            value={email}
            onValueChange={setEmail}
            isInvalid={isInvalid}
            color={isInvalid ? "danger" : "default"}
            errorMessage={isInvalid && "Please enter a valid email"}
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
          <Button color="primary" variant="shadow" type="submit">
            Login
          </Button>{" "}
        </form>
      </main>
    </>
  );
}
