import {
  Input,
  Select,
  SelectItem,
  Checkbox,
  AutocompleteItem,
  Button,
  Textarea,
  Autocomplete,
} from "@nextui-org/react";

export default function Form1() {
  const statuses = ["Filed", "Unfiled"];
  const categories = ["Process/Product", "Category 1", "Category2"];

  const users = [
    {
      id: 1,
      name: "Tony Reichert",
      role: "CEO",
      team: "Management",
      status: "active",
      age: "29",
      avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png",
      email: "tony.reichert@example.com",
    },
    {
      id: 2,
      name: "Zoey Lang",
      role: "Tech Lead",
      team: "Development",
      status: "paused",
      age: "25",
      avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/1.png",
      email: "zoey.lang@example.com",
    },
    {
      id: 3,
      name: "Jane Fisher",
      role: "Sr. Dev",
      team: "Development",
      status: "active",
      age: "22",
      avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/2.png",
      email: "jane.fisher@example.com",
    },
    {
      id: 4,
      name: "William Howard",
      role: "C.M.",
      team: "Marketing",
      status: "vacation",
      age: "28",
      avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/2.png",
      email: "william.howard@example.com",
    },
    {
      id: 5,
      name: "Kristen Copper",
      role: "S. Manager",
      team: "Sales",
      status: "active",
      age: "24",
      avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/3.png",
      email: "kristen.cooper@example.com",
    },
  ];

  return (
    <>
      <Input
        size="sm"
        type="text"
        label="Patent Title"
        variant="faded"
        className="max-w-5xl"
        isRequired
      />

      <Input
        size="sm"
        type="text"
        label="File/Application No"
        variant="faded"
        className="max-w-5xl"
        isRequired
      />

      <Select label="Category" className="max-w-5xl" size="sm" isRequired>
        {categories.map((category) => (
          <SelectItem key={category} value={category}>
            {category}
          </SelectItem>
        ))}
      </Select>

      <Select label="Status" className="max-w-5xl" size="sm" isRequired>
        {statuses.map((status) => (
          <SelectItem key={status} value={status}>
            {status}
          </SelectItem>
        ))}
      </Select>

      <Input
        size="sm"
        type="text"
        label="Application Date"
        variant="faded"
        className="max-w-5xl"
        isRequired
      />

      <Input
        size="sm"
        type="text"
        label="Published Date"
        variant="faded"
        className="max-w-5xl"
        isRequired
      />

      <Input
        size="sm"
        type="text"
        label="Grant Date"
        variant="faded"
        className="max-w-5xl"
        isRequired
      />

      <div className="flex max-w-5xl gap-2 items-center">
        <Autocomplete
          label="PI(s) from PDEU"
          className="max-w-5xl"
          size="sm"
          variant="faded"
          isRequired
        >
          {users.map((user) => (
            <AutocompleteItem key={user.id} value={user.name}>
              {user.name}
            </AutocompleteItem>
          ))}
        </Autocomplete>
        <Button color="primary">Add</Button>
        <Checkbox>First</Checkbox>
        <Checkbox>Corresponding</Checkbox>
      </div>

      <div className="flex max-w-5xl gap-2 items-center">
        <Input
          size="sm"
          type="text"
          label="PI(s) outside of PDEU"
          variant="faded"
          className="max-w-5xl"
        />
        <Button color="primary">Add</Button>
        <Checkbox>First</Checkbox>
        <Checkbox>Corresponding</Checkbox>
      </div>
    </>
  );
}
