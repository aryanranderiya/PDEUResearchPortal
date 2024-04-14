import * as React from "react";
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

export default function Form1({ is_conference = false }) {
  const [inputFields, setInputFields] = React.useState([""]);

  const handleAddField = () => {
    setInputFields([...inputFields, ""]);
  };

  const handleRemoveField = (index) => {
    const newInputFields = [...inputFields];
    newInputFields.splice(index, 1);
    setInputFields(newInputFields);
  };

  // const handleChange = (index, event) => {
  //   const newInputFields = [...inputFields];
  //   newInputFields[index] = event;
  //   setInputFields(newInputFields);
  // };

  React.useEffect(() => {
    console.log(inputFields);
  }, [inputFields]);

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
  ];

  const quartiles = ["Q1", "Q2", "Q3", "Q4"];
  const journal_indexed = ["Scopus", "Web of Science (WOS)"];

  const levels = ["International", "National"];

  function PDEUAuthors({ main = false }) {
    return (
      <>
        {inputFields.map((field, index) => (
          <div key={index} className="flex max-w-5xl gap-2 items-center">
            <Autocomplete
              label="Author from PDEU"
              className="max-w-5xl"
              size="sm"
              variant="faded"
              isRequired
              onInputChange={(e) => setInputFields(e)}
            >
              {users.map((user) => (
                <AutocompleteItem
                  key={user.id}
                  value={user.name}
                  defaultSelectedKey={field}
                >
                  {user.name}
                </AutocompleteItem>
              ))}
            </Autocomplete>
            <Checkbox>First</Checkbox>
            <Checkbox>Corresponding</Checkbox>

            {main ? (
              <Button
                color="primary"
                id="addAuthor"
                onClick={() => handleAddField()}
              >
                Add
              </Button>
            ) : (
              <Button
                isIconOnly
                color="danger"
                aria-label="Remove"
                onClick={() => handleRemoveField()}
              >
                <span className="material-symbols-rounded">close</span>
              </Button>
            )}
          </div>
        ))}
      </>
    );
  }

  return (
    <div className="main_form">
      <Input
        size="sm"
        type="text"
        label="Paper Title"
        variant="faded"
        className="max-w-5xl"
        isRequired
      />

      <Textarea
        label="Abstract"
        className="max-w-5xl"
        variant="faded"
        isRequired
      />

      <Input
        size="sm"
        type="text"
        label="Journal Name"
        variant="faded"
        className="max-w-5xl"
        isRequired
      />

      <Select label="Quartile" className="max-w-5xl" size="sm" isRequired>
        {quartiles.map((quartile) => (
          <SelectItem key={quartile} value={quartile}>
            {quartile}
          </SelectItem>
        ))}
      </Select>

      <Select
        label="Journal Indexed"
        className="max-w-5xl"
        size="sm"
        isRequired
      >
        {journal_indexed.map((journal) => (
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
        isRequired
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

      <Input
        size="sm"
        type="date"
        label="Paper Publish Date"
        variant="faded"
        className="max-w-5xl"
        isRequired
      />

      <Input
        size="sm"
        type="text"
        label="ISSN No./ISBN No."
        variant="faded"
        className="max-w-5xl"
        isRequired
      />
      <Input
        size="sm"
        type="text"
        label="DOI (i.e https://doi.org/10...)"
        variant="faded"
        className="max-w-5xl"
        isRequired
      />

      <PDEUAuthors main={true} />

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

      {is_conference ? (
        <>
          <Input
            size="sm"
            type="text"
            label="Conference Name"
            variant="faded"
            className="max-w-5xl"
            isRequired
          />
          <Input
            size="sm"
            type="date"
            label="Conference Date"
            variant="faded"
            className="max-w-5xl"
            isRequired
          />
          <Input
            size="sm"
            type="text"
            label="Conference City"
            variant="faded"
            className="max-w-5xl"
            isRequired
          />
          <Select
            label="Conference Level"
            className="max-w-5xl"
            size="sm"
            isRequired
          >
            {levels.map((level) => (
              <SelectItem key={level} value={level}>
                {level}
              </SelectItem>
            ))}
          </Select>
        </>
      ) : (
        <></>
      )}

      <div className="flex max-w-5xl gap-2 items-center justify-center">
        <Button color="primary" size="md">
          Submit
        </Button>
        <Button color="default" size="md" variant="ghost">
          Cancel
        </Button>
      </div>
    </div>
  );
}
