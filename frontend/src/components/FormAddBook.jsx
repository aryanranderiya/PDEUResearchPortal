import React, { useState } from "react";
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

export default function Form2() {
  const book_type = ["Research based books or monographs"];
  const publisher_type = ["International", "National"];

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

  const [formData, setFormData] = useState({
    Book_Title: "",
    Abstract: "",
    Book_Type: "",
    Publisher_Name: "",
    Publisher_Type: "",
    Volume: "",
    Edition: "",
    Total_Pages: "",
    Publish_Date: "",
    ISBN: "",
    DOI: "",
    PDEU_Author: "",
    Outside_Author: "",
    First: false,
    Corresponding: false,
  });

  const handleChange = (field, value) => {
    // console.log(value);
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="main_form">
        <Input
          size="sm"
          type="text"
          label="Book Title"
          variant="faded"
          className="max-w-5xl"
          isRequired
          value={formData.Book_Title}
          onValueChange={(value) => handleChange("Book_Title", value)}
        />

        <Textarea
          label="Abstract"
          className="max-w-5xl"
          variant="faded"
          isRequired
          value={formData.Abstract}
          onValueChange={(value) => handleChange("Abstract", value)}
        />

        <Select
          label="Book Type"
          className="max-w-5xl"
          size="sm"
          isRequired
          value={book_type[formData.Book_Type]}
          onSelectionChange={(e) =>
            setFormData({ ...formData, Book_Type: e["currentKey"] })
          }
        >
          {book_type.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
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
          value={formData.Publisher_Name}
          onValueChange={(value) => handleChange("Publisher_Name", value)}
        />

        <Select
          label="Publisher Type"
          className="max-w-5xl"
          size="sm"
          isRequired
          value={formData.Publisher_Type}
          onValueChange={(value) => handleChange("Publisher_Type", value)}
        >
          {publisher_type.map((publisher) => (
            <SelectItem key={publisher} value={publisher}>
              {publisher}
            </SelectItem>
          ))}
        </Select>

        <div className="flex max-w-5xl gap-2 items-center">
          <Input
            size="sm"
            type="text"
            label="Volume"
            variant="faded"
            className="max-w-5xl"
            isRequired
            value={formData.Volume}
            onValueChange={(value) => handleChange("Volume", value)}
          />
          <Input
            size="sm"
            type="text"
            label="Edition"
            variant="faded"
            className="max-w-5xl"
            isRequired
            value={formData.Edition}
            onValueChange={(value) => handleChange("Edition", value)}
          />
        </div>

        <Input
          size="sm"
          type="number"
          label="Total Pages"
          variant="faded"
          className="max-w-5xl"
          isRequired
          value={formData.Total_Pages}
          onValueChange={(value) => handleChange("Total_Pages", value)}
        />

        <Input
          size="sm"
          type="date"
          label="Publish Date"
          variant="faded"
          className="max-w-5xl"
          isRequired
          value={formData.Publish_Date}
          onValueChange={(value) => handleChange("Publish_Date", value)}
        />

        <Input
          size="sm"
          type="text"
          label="ISBN No."
          variant="faded"
          className="max-w-5xl"
          isRequired
          value={formData.ISBN}
          onValueChange={(value) => handleChange("ISBN", value)}
        />

        <Input
          size="sm"
          type="text"
          label="DOI (i.e https://doi.org/19...)"
          variant="faded"
          className="max-w-5xl"
          isRequired
          value={formData.DOI}
          onValueChange={(value) => handleChange("DOI", value)}
        />

        <div className="flex max-w-5xl gap-2 items-center">
          <Autocomplete
            label="Author from PDEU"
            className="max-w-5xl"
            size="sm"
            variant="faded"
            isRequired
            onSelectionChange={(value) => handleChange("PDEU_Author", value)}
          >
            {users.map((user) => (
              <AutocompleteItem key={user.id} value={user.name}>
                {user.name}
              </AutocompleteItem>
            ))}
          </Autocomplete>
          <Button color="primary">Add</Button>
          <Checkbox
            checked={formData.First}
            onChange={(e) => handleChange("First", e.target.checked)}
          >
            First
          </Checkbox>
          <Checkbox
            checked={formData.Corresponding}
            onChange={(e) => handleChange("Corresponding", e.target.checked)}
          >
            Corresponding
          </Checkbox>
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
