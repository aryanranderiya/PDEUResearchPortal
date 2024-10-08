import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
  Skeleton,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import * as React from "react";

export default function CardComponent({
  heading,
  subheading,
  imagelink,
  page,
}) {
  const navigate = useNavigate();
  const [isImageLoaded, setIsImageLoaded] = React.useState(false);

  return (
    <Card
      className="py-4 card"
      isPressable
      onPress={() => navigate(page)}
      shadow="lg"
    >
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start w-full text-center">
        <p className="text-large">
          <b>{heading}</b>
        </p>
        <small className="text-default-500">{subheading}</small>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Skeleton className="skeleton" isLoaded={isImageLoaded} width={200}>
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src={imagelink}
            onLoad={() => setIsImageLoaded(true)}
            width={200}
          />
        </Skeleton>
        <Image />
      </CardBody>
      <CardFooter className="flex justify-center">
        <Button color="primary" onClick={() => navigate(page)}>
          View All {heading}
        </Button>
      </CardFooter>
    </Card>
  );
}
