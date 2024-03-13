import { Input } from "@nextui-org/react";
import { Button, ButtonGroup } from "@nextui-org/react";
import { Select, SelectSection, SelectItem } from "@nextui-org/react";

export function SelectComponent() {
  return (
    <>
      <Select label="Select Login Type" className="max-w-xs">
        {animals.map((animal) => (
          <SelectItem key={animal.value} value={animal.value}>
            {animal.label}
          </SelectItem>
        ))}
      </Select>
      <Select
        label="Favorite Animal"
        placeholder="Select an animal"
        className="max-w-xs"
      >
        {animals.map((animal) => (
          <SelectItem key={animal.value} value={animal.value}>
            {animal.label}
          </SelectItem>
        ))}
      </Select>
    </>
  );
}

export default function Login() {
  return (
    <>
      <Input isRequired type="email" label="Email" className="max-w-xs" />
      <Input isRequired type="password" label="Password" className="max-w-xs" />
      <Button color="primary">Login</Button>
    </>
  );
}
