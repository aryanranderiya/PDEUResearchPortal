import { Avatar, Button, Input } from "@nextui-org/react";

export default function UserProfile() {
  return (
    <>
      <Avatar
        src="https://links.aryanranderiya.com/l/default_user"
        size="lg"
        isBordered
      />

      <Input
        isDisabled
        type="email"
        label="Email"
        variant="faded"
        defaultValue="test@test.com"
        className="max-w-xs faded_input"
      />

      <Input
        isDisabled
        type="text"
        label="Designation"
        defaultValue="Faculty"
        variant="faded"
        className="max-w-xs faded_input"
      />

      <Input
        type="text"
        label="Name"
        defaultValue="test name"
        className="max-w-xs"
        variant="faded"
      />

      <Button color="primary" size="lg" className="button_width">
        Save Profile
      </Button>
    </>
  );
}
