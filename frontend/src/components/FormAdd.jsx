import { Input, Select, SelectItem } from "@nextui-org/react";

export default function Form() {
  const quartiles = ["Q1", "Q2"];
  return (
    <div className="main_form">
      <Input
        type="text"
        label="Paper Title"
        variant="faded"
        className="max-w-5xl"
      />
      <Input
        type="text"
        label="Abstract"
        variant="faded"
        className="max-w-5xl"
      />
      <Input
        type="text"
        label="Journal Name"
        variant="faded"
        className="max-w-5xl"
      />

      <Select label="Quartile" className="max-w-5xl">
        {quartiles.map((quartile) => (
          <SelectItem key={quartile} value={quartile}>
            {quartile}
          </SelectItem>
        ))}
      </Select>

      <Input
        type="text"
        label="Publisher Name"
        variant="faded"
        className="max-w-5xl"
      />
    </div>
  );
}
