import * as React from "react";
// import SelectComponent from "../components/ComponentLoginSelect";
import ThemeContext from "../contexts/ThemeContext";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import {
  EyeSlashFilledIcon,
  EyeFilledIcon,
  SunIcon,
  MoonIcon,
} from "../components/icons";
import { Input, Button, Spinner, Switch } from "@nextui-org/react";

export default function Login() {
  const navigate = useNavigate();
  const { isAuthenticated, setAuthenticated } = React.useContext(AuthContext);
  const [isVisible, setIsVisible] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loginLoading, setloginLoading] = React.useState(false);

  const validateEmail = (email) =>
    email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g);

  const isInvalid = React.useMemo(() => {
    if (email === "") return false;
    return validateEmail(email) ? false : true;
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloginLoading(true);

    try {
      const response = await fetch(
        "https://pdeu-research-portal-api.vercel.app/login",
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
      setloginLoading(false);
      setAuthenticated(true);
      console.log("Successfully Logged in!");
      localStorage.setItem("userId", responseJson.user.id);
      if (isAuthenticated === true) navigate("/home");
    } catch (error) {
      setloginLoading(false);
      console.error("Error posting data:", error.message);
      alert(error);
    }
  };

  const { darkTheme, setDarkTheme } = React.useContext(ThemeContext);
  const [isSelected, setIsSelected] = React.useState(false);

  React.useEffect(() => {
    if (isSelected === true) setDarkTheme("dark");
    else setDarkTheme("light");
  }, [isSelected, setDarkTheme]);

  React.useEffect(() => {
    if (darkTheme === "dark") setIsSelected(true);
    else setIsSelected(false);
  }, []);

  return (
    <>
      <main>
        <form
          method="post"
          onSubmit={handleSubmit}
          className={`${darkTheme} text-foreground bg-background text-center flex justify-center gap-4 h-screen items-center flex-col w-screen`}
        >
          <h1 className="title">
            Welcome to the PDEU Faculty Research Portal!
          </h1>
          {/* <SelectComponent /> */}
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
          <Button
            color="primary"
            variant="shadow"
            type="submit"
            isLoading={loginLoading}
            spinner={<Spinner color="default" size="sm" />}
            size="md"
          >
            Login
          </Button>

          <Switch
            isSelected={isSelected}
            onValueChange={setIsSelected}
            size="lg"
            startContent={<SunIcon />}
            endContent={<MoonIcon />}
            className="loginpage_switch"
          />
        </form>
      </main>
    </>
  );
}
