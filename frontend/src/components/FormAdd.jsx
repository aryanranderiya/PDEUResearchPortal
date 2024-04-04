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

export default function Form() {
  const quartiles = ["Q1", "Q2", "Q3", "Q4"];
  const journals = ["Scopus", "Web of Science (WOS)"];
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
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const years = Array.from(
    { length: 100 },
    (_, i) => new Date().getFullYear() - i
  );

  return (
    <div className="main_form">
      <Input
        size="sm"
        type="text"
        label="Paper Title"
        variant="faded"
        className="max-w-5xl"
      />
      <Textarea label="Abstract" className="max-w-5xl" variant="faded" />
      <Input
        size="sm"
        type="text"
        label="Journal Name"
        variant="faded"
        className="max-w-5xl"
      />
      <Select label="Quartile" className="max-w-5xl" size="sm">
        {quartiles.map((quartile) => (
          <SelectItem key={quartile} value={quartile}>
            {quartile}
          </SelectItem>
        ))}
      </Select>
      <Select label="Journal" className="max-w-5xl" size="sm">
        {journals.map((journal) => (
          <SelectItem key={journal} value={journal}>
            {journal}
          </SelectItem>
        ))}
      </Select>
      <Input
        size="sm"
        type="text"
        label="Publisher Name"
        variant="faded"
        className="max-w-5xl"
      />
      <div className="flex max-w-5xl gap-2">
        <Input
          size="sm"
          type="text"
          label="Volume"
          variant="faded"
          className="max-w-5xl"
        />
        <Input
          size="sm"
          type="text"
          label="Issue"
          variant="faded"
          className="max-w-5xl"
        />
      </div>
      <div className="flex max-w-5xl gap-2">
        <Input
          size="sm"
          type="number"
          label="Page Start"
          variant="faded"
          className="max-w-5xl"
        />
        <Input
          size="sm"
          type="number"
          label="Page End"
          variant="faded"
          className="max-w-5xl"
        />
      </div>
      <div className="flex max-w-5xl gap-2">
        <Select label="Month" className="max-w-5xl" size="sm">
          {months.map((map) => (
            <SelectItem key={map} value={map}>
              {map}
            </SelectItem>
          ))}
        </Select>

        <Select label="Year" className="max-w-5xl" size="sm">
          {years.map((year) => (
            <SelectItem key={year} value={year}>
              {year}
            </SelectItem>
          ))}
        </Select>
      </div>
      <Input
        size="sm"
        type="text"
        label="ISSN No./ISBN No."
        variant="faded"
        className="max-w-5xl"
      />
      <Input
        size="sm"
        type="text"
        label="DOI (i.e https://doi.org/10...)"
        variant="faded"
        className="max-w-5xl"
      />
      <Select label="Year" className="max-w-5xl" size="sm">
        {years.map((year) => (
          <SelectItem key={year} value={year}>
            <Checkbox value={year}> {year}</Checkbox>
          </SelectItem>
        ))}
      </Select>

      <div className="flex max-w-5xl gap-2 items-center">
        <Autocomplete
          label="Author from PDEU"
          className="max-w-5xl"
          size="sm"
          variant="faded"
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
          label="Author outside of PDEU"
          variant="faded"
          className="max-w-5xl"
        />
        <Button color="primary">Add</Button>
        <Checkbox>First</Checkbox>
        <Checkbox>Corresponding</Checkbox>
      </div>
      <div className="flex max-w-5xl gap-2 items-center justify-center">
        <Button color="success" size="md">
          Submit
        </Button>
        <Button color="default" size="md" variant="ghost">
          Cancel
        </Button>
      </div>
    </div>
  );
}
