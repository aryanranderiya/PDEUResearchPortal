import { Select, SelectItem } from "@nextui-org/react";
export default function SelectComponent() {
  const loginTypes = [
    { label: "Faculty", value: "Faculty" },
    { label: "Head of Department", value: "HOD" },
    { label: "Director", value: "Director" },
  ];

  return (
    <>
      <Select
        label="Role"
        placeholder="Select Role"
        className="max-w-xs select-input"
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
