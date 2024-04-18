import * as React from "react";
import {
  Input,
  Checkbox,
  AutocompleteItem,
  Button,
  Textarea,
  Autocomplete,
  RadioGroup,
  Radio,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

export default function Form1({ is_conference = false }) {
  const navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [successfullyUploaded, setsuccessfullyUploaded] = React.useState(true);

  function FormAddedModal() {
    const title = is_conference ? "Conference Proceedings" : "Journal Paper";

    const link = is_conference
      ? "/home/conferencepapers"
      : "/home/journalpapers";

    const body = successfullyUploaded
      ? "Successfully Uploaded"
      : "Error Uploading";

    return (
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <p>
                  <br></br>
                  {body}: {title}
                  <br></br>
                  <br></br>
                  <b>DOI:</b> {formData.DOI}
                </p>
              </ModalBody>

              <ModalFooter>
                <Button color="danger" onPress={onClose}>
                  X
                </Button>

                <Button
                  color="default"
                  onPress={() => {
                    navigate("/home");
                  }}
                >
                  Home
                </Button>

                <Button
                  color="primary"
                  onPress={() => {
                    navigate(link);
                  }}
                >
                  View All {title}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    );
  }

  const [authorInputFields, setAuthorInputFields] = React.useState([[]]);
  const postType = is_conference ? "conferencepapers" : "journalpapers";

  const [formData, setformData] = React.useState({
    Title: "",
    Abstract: "",
    Journal_Name: "",
    Quartile: "",
    Journal_Indexed: "",
    Publisher_Name: "",
    Volume: null,
    Issue: null,
    Page_start: null,
    Page_end: null,
    Publish_date: "",
    ISSN: "",
    DOI: "",
    Created_By: localStorage.getItem("userId"),
    // pdeu_authors: [],
    // outside_authors: [],
  });

  const [conferenceFormData, setConferenceFormData] = React.useState({
    DOI: "",
    Conference_Name: "",
    Conference_Date: "",
    Conference_City: "",
    Conference_Level: "",
    Created_By: localStorage.getItem("userId"),
  });

  // React.useEffect(() => {
  //   console.log({
  //     journalData: formData,
  //     conferenceData: conferenceFormData,
  //   });
  // }, [formData, conferenceFormData]);

  const quartiles = ["Q1", "Q2", "Q3", "Q4"];
  const journal_indexed = ["Scopus", "Web of Science (WOS)"];
  const levels = ["International", "National"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        // `https://pdeu-research-portal-api.vercel.app/insert/${postType}`,
        `http://localhost:5000/insert/${postType}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            journalData: formData,
            conferenceData: conferenceFormData,
          }),
        }
      );

      console.log(response);

      if (!response.ok) throw new Error(response.error);
      else {
        setsuccessfullyUploaded(true);
        console.log("Form submitted successfully");
      }
    } catch (error) {
      console.error("Error posting data:", error.message);
      setsuccessfullyUploaded(false);
    }

    onOpen();
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
                color="default"
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
      <FormAddedModal />
      <div className="main_form">
        <Input
          size="sm"
          type="text"
          label="Paper Title"
          className="max-w-5xl"
          variant="faded"
          isRequired
          value={formData.Title}
          onValueChange={(value) => setformData({ ...formData, Title: value })}
        />

        <Textarea
          label="Abstract"
          className="max-w-5xl"
          variant="faded"
          isRequired
          value={formData.Abstract}
          onValueChange={(value) =>
            setformData({ ...formData, Abstract: value })
          }
        />

        <Input
          size="sm"
          type="text"
          label="Journal Name"
          variant="faded"
          className="max-w-5xl"
          isRequired
          value={formData.Journal_Name}
          onValueChange={(value) =>
            setformData({ ...formData, Journal_Name: value })
          }
        />

        <RadioGroup
          label="Quartile"
          orientation="horizontal"
          value={quartiles[formData.Quartile]}
          onValueChange={(e) => setformData({ ...formData, Quartile: e })}
        >
          {quartiles.map((quartile) => (
            <Radio value={quartile}>{quartile}</Radio>
          ))}
        </RadioGroup>

        <RadioGroup
          label="Journal Indexed"
          orientation="horizontal"
          value={journal_indexed[formData.Journal_Indexed]}
          onValueChange={(e) =>
            setformData({ ...formData, Journal_Indexed: e })
          }
        >
          {journal_indexed.map((journal) => (
            <Radio value={journal}>{journal}</Radio>
          ))}
        </RadioGroup>

        <Input
          size="sm"
          type="text"
          label="Publisher Name"
          variant="faded"
          className="max-w-5xl"
          isRequired
          value={formData.Publisher_Name}
          onValueChange={(value) =>
            setformData({ ...formData, Publisher_Name: value })
          }
        />
        <div className="flex max-w-5xl gap-2">
          <Input
            size="sm"
            type="text"
            label="Volume"
            variant="faded"
            className="max-w-5xl"
            value={formData.Volume}
            onValueChange={(value) =>
              setformData({ ...formData, Volume: value })
            }
          />
          <Input
            size="sm"
            type="text"
            label="Issue"
            variant="faded"
            className="max-w-5xl"
            value={formData.Issue}
            onValueChange={(value) =>
              setformData({ ...formData, Issue: value })
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
            value={formData.Page_start}
            onValueChange={(value) =>
              setformData({ ...formData, Page_start: value })
            }
          />
          <Input
            size="sm"
            type="number"
            label="Page End"
            variant="faded"
            className="max-w-5xl"
            value={formData.Page_end}
            onValueChange={(value) =>
              setformData({ ...formData, Page_end: value })
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
          value={formData.Publish_date}
          onValueChange={(value) =>
            setformData({ ...formData, Publish_date: value })
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
          onValueChange={(value) => {
            setformData({ ...formData, DOI: value });
            setConferenceFormData({ ...conferenceFormData, DOI: value });
          }}
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
          <Button color="default">Add</Button>
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
              value={conferenceFormData.Conference_Name}
              onValueChange={(value) =>
                setConferenceFormData({
                  ...conferenceFormData,
                  Conference_Name: value,
                })
              }
            />
            <Input
              size="sm"
              type="date"
              label="Conference Date"
              variant="faded"
              className="max-w-5xl"
              isRequired
              value={conferenceFormData.Conference_Date}
              onValueChange={(value) =>
                setConferenceFormData({
                  ...conferenceFormData,
                  Conference_Date: value,
                })
              }
            />
            <Input
              size="sm"
              type="text"
              label="Conference City"
              variant="faded"
              className="max-w-5xl"
              isRequired
              value={conferenceFormData.Conference_City}
              onValueChange={(value) =>
                setConferenceFormData({
                  ...conferenceFormData,
                  Conference_City: value,
                })
              }
            />

            <RadioGroup
              label="Conference Level"
              orientation="horizontal"
              value={levels[conferenceFormData.Conference_Level]}
              onValueChange={(e) =>
                setConferenceFormData({
                  ...conferenceFormData,
                  Conference_Level: e,
                })
              }
            >
              {levels.map((level) => (
                <Radio value={level}>{level}</Radio>
              ))}
            </RadioGroup>
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
