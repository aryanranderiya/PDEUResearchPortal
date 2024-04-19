import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

export default function CardComponent({
  heading,
  subheading,
  imagelink,
  page,
}) {
  const navigate = useNavigate();

  const navigateToPage = () => {
    navigate(page);
  };

  return (
    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-large uppercase font-bold">{heading}</p>
        <small className="text-default-500">
          {subheading} {heading}
        </small>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src={imagelink}
          width={220}
        />
        <Image />
      </CardBody>
      <CardFooter className="flex justify-center">
        <Button color="primary" onClick={() => navigateToPage()}>
          View {heading}
        </Button>
      </CardFooter>
    </Card>
  );
}
