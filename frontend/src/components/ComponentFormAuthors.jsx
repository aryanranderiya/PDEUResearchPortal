import * as React from "react";
import {
  Checkbox,
  AutocompleteItem,
  Button,
  Autocomplete,
} from "@nextui-org/react";

export default function PDEUAuthors({ authorData, setauthorData }) {
  const [users, setUsers] = React.useState([{ user: "none" }]);

  const [authorInputFields, setAuthorInputFields] = React.useState([[]]);

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
    setauthorData((prevData) => ({ ...prevData, [index]: users[value].name }));
  };

  React.useEffect(() => {
    const fetchUsernames = async () => {
      try {
        const response = await fetch(`http://localhost:5000/fetchusernames`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error(response.error);
        else setUsers(await response.json());
      } catch (error) {
        console.error("Error posting data:", error.message);
      }
    };

    fetchUsernames();
  }, []);

  return (
    <>
      {authorInputFields.map((value, index) => (
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
            {users.map((user, index) => (
              <AutocompleteItem key={index} value={user.name}>
                {user.name}
              </AutocompleteItem>
            ))}
          </Autocomplete>
          <Checkbox>First</Checkbox>
          <Checkbox>Corresponding</Checkbox>

          {authorInputFields.length !== users.length && (
            <Button
              color="primary"
              id="addAuthor"
              onClick={handleInputFieldAdd}
            >
              Add
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
