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
  const [authorInputFields, setAuthorInputFields] = React.useState([[]]);

  const [formData, setformData] = React.useState({
    title: "",
    abstract: "",
    journal_name: "",
    quartile: "",
    journal_indexed: "",
    publisher_name: "",
    volume: "",
    issue: "",
    page_start: "",
    page_end: "",
    publish_date: "",
    ISSN: "",
    DOI: "",
    pdeu_authors: [],
    outside_authors: [],
  });

  React.useEffect(() => {
    console.log(formData);
  }, [formData]);

  const quartiles = ["Q1", "Q2", "Q3", "Q4"];
  const journal_indexed = ["Scopus", "Web of Science (WOS)"];
  const levels = ["International", "National"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/insert/researchpaper",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      console.log("Response", response);
    } catch (error) {
      console.error("Error posting data:", error.message);
    }
  };

  const handleInputFieldAdd = () => {
    setAuthorInputFields([...authorInputFields, []]);
  };

  const handleInputFieldRemove = (index) => {
    const list = [...authorInputFields];
    list.splice(index, 1);
    setAuthorInputFields(list);
  };

  const handleInputFieldsChange = (value, index) => {
    const list = [...authorInputFields];
    list[index] = value;
    setAuthorInputFields(list);
  };

  const users = [
    {
      id: 0,
      name: "Tony Reichert",
      role: "CEO",
      team: "Management",
      status: "active",
      age: "29",
      avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png",
      email: "tony.reichert@example.com",
    },
    {
      id: 1,
      name: "Zoey Lang",
      role: "Tech Lead",
      team: "Development",
      status: "paused",
      age: "25",
      avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/1.png",
      email: "zoey.lang@example.com",
    },
    {
      id: 2,
      name: "Jane Fisher",
      role: "Sr. Dev",
      team: "Development",
      status: "active",
      age: "22",
      avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/2.png",
      email: "jane.fisher@example.com",
    },
  ];

  function PDEUAuthors() {
    return (
      <>
        {authorInputFields.map((index) => (
          <div key={index} className="flex max-w-5xl gap-2 items-center">
            <Autocomplete
              label="Author from PDEU"
              className="max-w-5xl"
              size="sm"
              variant="faded"
              isRequired
              onSelectionChange={(e) => handleInputFieldsChange(e, index)}
              defaultSelectedKey={authorInputFields[index]}
            >
              {users.map((user) => (
                <AutocompleteItem key={user.id} value={user.id}>
                  {user.name}
                </AutocompleteItem>
              ))}
            </Autocomplete>
            <Checkbox>First</Checkbox>
            <Checkbox>Corresponding</Checkbox>

            {authorInputFields.length - 1 === index && (
              <Button
                color="primary"
                id="addAuthor"
                onClick={handleInputFieldAdd}
              >
                Add Authors
              </Button>
            )}

            {authorInputFields.length !== 1 && (
              <Button
                isIconOnly
                color="danger"
                aria-label="Remove"
                onClick={() => handleInputFieldRemove(index)}
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
    <form onSubmit={handleSubmit}>
      <div className="main_form">
        <Input
          size="sm"
          type="text"
          label="Paper Title"
          variant="faded"
          className="max-w-5xl"
          isRequired
          value={formData.title}
          onValueChange={(value) => setformData({ ...formData, title: value })}
        />

        <Textarea
          label="Abstract"
          className="max-w-5xl"
          variant="faded"
          isRequired
          value={formData.abstract}
          onValueChange={(value) =>
            setformData({ ...formData, abstract: value })
          }
        />

        <Input
          size="sm"
          type="text"
          label="Journal Name"
          variant="faded"
          className="max-w-5xl"
          isRequired
          value={formData.journal_name}
          onValueChange={(value) =>
            setformData({ ...formData, journal_name: value })
          }
        />

        <Select
          label="Quartile"
          className="max-w-5xl"
          size="sm"
          isRequired
          selectedKeys={quartiles[formData.quartile]}
          onSelectionChange={(e) =>
            setformData({ ...formData, quartile: e["currentKey"] })
          }
        >
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
          selectedKeys={journal_indexed[formData.journal_indexed]}
          onSelectionChange={(e) =>
            setformData({ ...formData, journal_indexed: e["currentKey"] })
          }
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
          value={formData.publisher_name}
          onValueChange={(value) =>
            setformData({ ...formData, publisher_name: value })
          }
        />
        <div className="flex max-w-5xl gap-2">
          <Input
            size="sm"
            type="text"
            label="Volume"
            variant="faded"
            className="max-w-5xl"
            value={formData.volume}
            onValueChange={(value) =>
              setformData({ ...formData, volume: value })
            }
          />
          <Input
            size="sm"
            type="text"
            label="Issue"
            variant="faded"
            className="max-w-5xl"
            value={formData.issue}
            onValueChange={(value) =>
              setformData({ ...formData, issue: value })
            }
          />
        </div>

        <div className="flex max-w-5xl gap-2">
          <Input
            size="sm"
            type="number"
            label="Page Start"
            variant="faded"
            className="max-w-5xl"
            value={formData.page_start}
            onValueChange={(value) =>
              setformData({ ...formData, page_start: value })
            }
          />
          <Input
            size="sm"
            type="number"
            label="Page End"
            variant="faded"
            className="max-w-5xl"
            value={formData.page_end}
            onValueChange={(value) =>
              setformData({ ...formData, page_end: value })
            }
          />
        </div>

        <Input
          size="sm"
          type="date"
          label="Paper Publish Date"
          variant="faded"
          className="max-w-5xl"
          isRequired
          value={formData.publish_date}
          onValueChange={(value) =>
            setformData({ ...formData, publish_date: value })
          }
        />

        <Input
          size="sm"
          type="text"
          label="ISSN No./ISBN No."
          variant="faded"
          className="max-w-5xl"
          isRequired
          value={formData.ISSN}
          onValueChange={(value) => setformData({ ...formData, ISSN: value })}
        />
        <Input
          size="sm"
          type="text"
          label="DOI (i.e https://doi.org/10...)"
          variant="faded"
          className="max-w-5xl"
          isRequired
          value={formData.DOI}
          onValueChange={(value) => setformData({ ...formData, DOI: value })}
        />

        <PDEUAuthors />

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
          <Button color="primary" size="md" type="submit">
            Submit
          </Button>
          <Button color="default" size="md" variant="ghost">
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
}
