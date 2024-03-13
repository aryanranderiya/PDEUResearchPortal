import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { EyeSlashFilledIcon, EyeFilledIcon } from "./icons";
import * as React from "react";

export function SelectComponent() {
  const loginTypes = [
    { label: "Faculty", value: "Faculty" },
    { label: "Head of Department", value: "HOD" },
    { label: "Director", value: "Director" },
  ];

  return (
    <>
      <Select
        label="User Type"
        placeholder="Select User Type"
        className="max-w-xs"
        value="Faculty"
        isRequired={"true"}
        defaultSelectedKeys={["Faculty"]}
        variant="faded"
      >
        {loginTypes.map((loginType) => (
          <SelectItem key={loginType.value} value={loginType.value}>
            {loginType.label}
          </SelectItem>
        ))}
      </Select>
    </>
  );
}

export function Inputs() {
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
        placeholder="Enter your password"
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
    </>
  );
}

export default function Login() {
  return (
    <>
      <SelectComponent />

      <Inputs />
      <Button color="primary">Login</Button>
    </>
  );
}
