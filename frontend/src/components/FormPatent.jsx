import * as React from "react";
import { Input, Button, RadioGroup, Radio, Chip } from "@nextui-org/react";
import PatentPIs from "./ComponentFormPI";

export default function Form3({ formReadOnly }) {
  const statuses = ["Filed", "Unfiled"];
  const categories = ["Process/Product", "Category 1", "Category 2"];
  const [PIData, setPIData] = React.useState([]);
  const defaultText = formReadOnly ? "Loading..." : "";

  const [formData, setformData] = React.useState({
    Title: defaultText,
    FileApplicationNo: defaultText,
    Category: defaultText,
    Status: defaultText,
    ApplicationDate: null,
    PublishedDate: null,
    GrantDate: null,
    PI_PDEU: [],
    PI_Outside: [],
  });

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
                table_name: "Patents",
                where: [
                  "FileApplicationNo",
                  new URLSearchParams(window.location.search).get("id"),
                ],
              }),
            }
          );
          if (!response.ok) throw new Error(response.error);
          const responseJson = await response.json();
          console.log(responseJson[0]);
          setformData(responseJson[0]);
        } catch (error) {
          console.error("Error posting data:", error.message);
        }
      };

      if (formReadOnly) fetchRecordData();
    },
    [formReadOnly],
    []
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
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
          label="Patent Title"
          variant="faded"
          className="max-w-5xl"
          isRequired
          value={formData.Title}
          onValueChange={(value) => setformData({ ...formData, Title: value })}
          isReadOnly={formReadOnly}
        />

        <Input
          size="sm"
          type="text"
          label="File/Application No"
          variant="faded"
          className="max-w-5xl"
          isRequired
          value={formData.FileApplicationNo}
          onValueChange={(value) =>
            setformData({ ...formData, FileApplicationNo: value })
          }
          isReadOnly={formReadOnly}
        />

        <RadioGroup
          label="Category"
          orientation="horizontal"
          value={formData.Category}
          onValueChange={(value) =>
            setformData({ ...formData, Category: value })
          }
          isReadOnly={formReadOnly}
        >
          {categories.map((category, index) => (
            <Radio key={index} value={category}>
              {category}
            </Radio>
          ))}
        </RadioGroup>

        <RadioGroup
          label="Status"
          orientation="horizontal"
          value={formData.Status}
          onValueChange={(value) => setformData({ ...formData, Status: value })}
          isReadOnly={formReadOnly}
        >
          {statuses.map((status, index) => (
            <Radio key={index} value={status}>
              {status}
            </Radio>
          ))}
        </RadioGroup>

        <Input
          size="sm"
          type="date"
          label="Application Date"
          variant="faded"
          className="max-w-5xl"
          isRequired
          value={formData.ApplicationDate}
          onValueChange={(value) =>
            setformData({ ...formData, ApplicationDate: value })
          }
        />

        <Input
          size="sm"
          type="date"
          label="Published Date"
          variant="faded"
          className="max-w-5xl"
          isRequired
          value={formData.PublishedDate}
          onValueChange={(value) =>
            setformData({ ...formData, PublishedDate: value })
          }
        />

        <Input
          size="sm"
          type="date"
          label="Grant Date"
          variant="faded"
          className="max-w-5xl"
          isRequired
          value={formData.GrantDate}
          onValueChange={(value) =>
            setformData({ ...formData, GrantDate: value })
          }
        />

        <PatentPIs
          formDataFileApplicationNo={formData.FileApplicationNo}
          PIData={PIData}
          setPIData={setPIData}
          formReadOnly={formReadOnly}
        />

        <div className="flex max-w-5xl gap-2 items-center justify-center">
          <Button
            color="primary"
            size="md"
            type="submit"
            isDisabled={formReadOnly}
          >
            Submit
          </Button>
          <Button
            color="default"
            size="md"
            variant="ghost"
            isDisabled={formReadOnly}
            onClick={() => {
              setformData({
                Title: defaultText,
                FileApplicationNo: defaultText,
                Category: defaultText,
                Status: defaultText,
                ApplicationDate: null,
                PublishedDate: null,
                GrantDate: null,
              });
            }}
          >
            Clear
          </Button>
        </div>
      </div>
    </form>
  );
}
