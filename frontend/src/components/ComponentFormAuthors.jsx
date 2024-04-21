import * as React from "react";
import {
  Checkbox,
  AutocompleteItem,
  Button,
  Autocomplete,
  Input,
} from "@nextui-org/react";

export default function PDEUAuthors({
  formDataDOI,
  setauthorData,
  authorData,
  formReadOnly,
}) {
  const [users, setUsers] = React.useState([{ user: "none" }]);

  const [AuthorPDEUInputs, setAuthorPDEUInputs] = React.useState([[]]);
  const [AuthorOtherInputs, setAuthorOtherInputs] = React.useState([[]]);

  const handleAuthorInputAddOther = () =>
    setAuthorOtherInputs([...AuthorOtherInputs, []]);

  const handleAuthorInputAddPDEU = () =>
    setAuthorPDEUInputs([...AuthorPDEUInputs, []]);

  const handleAuthorInputRemovePDEU = (index) => {
    const list = [...AuthorPDEUInputs];
    list.splice(index, 1);
    setAuthorPDEUInputs(list);
  };

  const handleAuthorInputRemoveOther = (index) => {
    const list = [...AuthorOtherInputs];
    list.splice(index, 1);
    setAuthorOtherInputs(list);
  };

  React.useEffect(() => {
    if (formDataDOI) {
      console.log("authorData", authorData);

      for (let category in authorData) {
        for (let authorIndex in authorData[category]) {
          authorData[category][authorIndex].DOI = formDataDOI;
        }
      }
    }
  }, [authorData, formDataDOI]);

  const handleAuthorInputChangePDEU = (value, index) => {
    const list = [...AuthorPDEUInputs];
    list[index] = value;
    setAuthorPDEUInputs(list);

    if (value !== "" && users[value] && users[value].id)
      setauthorData((prevData) => ({
        ...prevData,
        PDEUAuthors: {
          ...prevData.PDEUAuthors,
          [index]: { DOI: formDataDOI, id: users[value].id },
        },
      }));
    else
      setauthorData((prevData) => ({
        ...prevData,
        PDEUAuthors: {
          ...prevData.PDEUAuthors,
          [index]: { DOI: formDataDOI, id: null },
        },
      }));
  };

  const handleAuthorInputChangeOther = (value, index) => {
    const list = [...AuthorOtherInputs];
    list[index] = value;
    setAuthorOtherInputs(list);

    if (value !== "")
      setauthorData((prevData) => ({
        ...prevData,

        OutsideAuthors: {
          ...prevData.OutsideAuthors,
          [index]: { DOI: formDataDOI, Author_Name: value },
        },
      }));
    else
      setauthorData((prevData) => ({
        ...prevData,
        OutsideAuthors: {
          ...prevData.OutsideAuthors,
          [index]: { DOI: formDataDOI, Author_Name: null },
        },
      }));
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
      {AuthorPDEUInputs.map((value, index) => (
        <div key={index} className="flex max-w-5xl gap-2 items-center">
          <Autocomplete
            label="Author from PDEU"
            className="max-w-5xl"
            size="sm"
            variant="faded"
            isRequired
            onSelectionChange={(e) => handleAuthorInputChangePDEU(e, index)}
            defaultSelectedKey={AuthorPDEUInputs[index]}
            isDisabled={formReadOnly}
          >
            {users.map((user, index) => (
              <AutocompleteItem key={index} value={user.id || ""}>
                {user.name}
              </AutocompleteItem>
            ))}
          </Autocomplete>
          <Checkbox>First</Checkbox>
          <Checkbox>Corresponding</Checkbox>

          {AuthorPDEUInputs.length !== users.length && (
            <Button
              color="primary"
              id="addAuthor"
              onClick={handleAuthorInputAddPDEU}
              isDisabled={formReadOnly}
            >
              Add
            </Button>
          )}
          {AuthorPDEUInputs.length !== 1 && (
            <Button
              isIconOnly
              color="danger"
              aria-label="Remove"
              onClick={() => handleAuthorInputRemovePDEU(index)}
              isDisabled={formReadOnly}
            >
              <span className="material-symbols-rounded">close</span>
            </Button>
          )}
        </div>
      ))}

      {AuthorOtherInputs.map((value, index) => (
        <div key={index} className="flex max-w-5xl gap-2 items-center">
          <Input
            size="sm"
            type="text"
            label="Author outside of PDEU"
            variant="faded"
            className="max-w-5xl"
            onValueChange={(e) => handleAuthorInputChangeOther(e, index)}
            isDisabled={formReadOnly}
          />
          <Checkbox>First</Checkbox>
          <Checkbox>Corresponding</Checkbox>
          <Button
            color="primary"
            id="addAuthor"
            onClick={handleAuthorInputAddOther}
            isDisabled={formReadOnly}
          >
            Add
          </Button>

          {AuthorOtherInputs.length !== 1 && (
            <Button
              isIconOnly
              color="danger"
              aria-label="Remove"
              onClick={() => handleAuthorInputRemoveOther(index)}
              isDisabled={formReadOnly}
            >
              <span className="material-symbols-rounded">close</span>
            </Button>
          )}
        </div>
      ))}
    </>
  );
}
