import React, { useState } from "react";
import {
  Input,
  Select,
  SelectItem,
  Button,
  Textarea,
  Chip,
} from "@nextui-org/react";
import { PDEUAuthors, OtherAuthors } from "./ComponentFormAuthors";

export default function Form2({ formReadOnly }) {
  const book_type = [{ value: "Research based books or monographs" }];
  const publisher_type = [{ value: "International" }, { value: "National" }];
  const defaultText = formReadOnly ? "Loading..." : "";

  const [formData, setFormData] = useState({
    Book_Title: defaultText,
    Book_Abstract: defaultText,
    Book_Type: defaultText,
    Publisher_name: defaultText,
    Publisher_type: defaultText,
    Book_Volume: defaultText,
    Book_Edition: defaultText,
    Total_Pages: defaultText,
    Book_Publish_Date: defaultText,
    ISBN: defaultText,
    DOI: defaultText,
  });
  const [authorData, setauthorData] = React.useState([]);
  const [users, setUsers] = React.useState([{ user: "none" }]);

  React.useEffect(() => {
    const fetchUsernames = async () => {
      try {
        const response = await fetch(
          `https://pdeu-research-portal-api.vercel.app/select`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: localStorage.getItem("userId"),
              table_name: "Employee",
              columns: "id,name",
            }),
          }
        );

        if (!response.ok) throw new Error(response.error);
        else setUsers(await response.json());
      } catch (error) {
        console.error("Error posting data:", error.message);
      }
    };

    fetchUsernames();
  }, []);
  React.useEffect(
    () => {
      const fetchRecordData = async () => {
        try {
          const response = await fetch(
            `https://pdeu-research-portal-api.vercel.app/select`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                columns: "*",
                table_name: "Books",
                where: [
                  "DOI",
                  new URLSearchParams(window.location.search).get("id"),
                ],
              }),
            }
          );
          if (!response.ok) throw new Error(response.error);
          const responseJson = await response.json();
          console.log(responseJson[0]);
          setFormData(responseJson[0]);
        } catch (error) {
          console.error("Error posting data:", error.message);
        }
      };

      if (formReadOnly) fetchRecordData();
    },
    [formReadOnly],
    []
  );

  const handleChange = (field, value) => {
    // console.log(value);
    setFormData({ ...formData, [field]: value.trim() });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="main_form">
        {formReadOnly && (
          <Chip color="danger" variant="flat">
            Read Only
          </Chip>
        )}
        <Input
          size="sm"
          type="text"
          label="Book Title"
          variant="faded"
          className="max-w-5xl"
          isRequired
          value={formData.Book_Title}
          onValueChange={(value) => handleChange("Book_Title", value)}
          isReadOnly={formReadOnly}
        />
        <Textarea
          label="Abstract"
          className="max-w-5xl"
          variant="faded"
          isRequired
          value={formData.Book_Abstract}
          onValueChange={(value) => handleChange("Abstract", value)}
          isReadOnly={formReadOnly}
        />
        <Select
          label="Book Type"
          className="max-w-5xl"
          size="sm"
          isRequired
          onSelectionChange={(e) =>
            setFormData({ ...formData, Book_Type: e["currentKey"] })
          }
          selectedKeys={[formData.Book_Type.trim()]}
          // isDisabled={formReadOnly}
        >
          {book_type.map((type) => (
            <SelectItem key={type.value} value={type.value}>
              {type.value}
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
          value={formData.Publisher_name}
          onValueChange={(value) => handleChange("Publisher_Name", value)}
          isReadOnly={formReadOnly}
        />
        <Select
          label="Publisher Type"
          className="max-w-5xl"
          size="sm"
          isRequired
          onValueChange={(value) => handleChange("Publisher_Type", value)}
          selectedKeys={[formData.Publisher_type]}
          isDisabled={formReadOnly}
        >
          {publisher_type.map((publisher) => (
            <SelectItem key={publisher.value} value={publisher.value}>
              {publisher.value}
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
            value={formData.Book_Volume}
            onValueChange={(value) => handleChange("Volume", value)}
            isReadOnly={formReadOnly}
          />
          <Input
            size="sm"
            type="text"
            label="Edition"
            variant="faded"
            className="max-w-5xl"
            isRequired
            value={formData.Book_Edition}
            onValueChange={(value) => handleChange("Edition", value)}
            isReadOnly={formReadOnly}
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
          isReadOnly={formReadOnly}
        />
        <Input
          size="sm"
          type="date"
          label="Publish Date"
          variant="faded"
          className="max-w-5xl"
          isRequired
          value={formData.Book_Publish_Date}
          onValueChange={(value) => handleChange("Publish_Date", value)}
          isReadOnly={formReadOnly}
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
          isReadOnly={formReadOnly}
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
          isReadOnly={formReadOnly}
        />
        <PDEUAuthors
          users={users}
          formDataDOI={formData.DOI}
          setauthorData={setauthorData}
          formReadOnly={formReadOnly}
        />
        <OtherAuthors
          formDataDOI={formData.DOI}
          setauthorData={setauthorData}
          formReadOnly={formReadOnly}
        />
        {!formReadOnly && (
          <div className="flex max-w-5xl gap-2 items-center justify-center">
            <Button color="primary" size="md" type="submit">
              Submit
            </Button>
            <Button color="default" size="md" variant="ghost">
              Clear
            </Button>
          </div>
        )}
      </div>
    </form>
  );
}
