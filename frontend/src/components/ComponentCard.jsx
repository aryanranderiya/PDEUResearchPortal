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

  // const navigateToPage = () => {
  //   ;
  // };

  return (
    <Card
      className="py-4"
      isPressable
      onPress={() => navigate(page)}
      shadow="lg"
    >
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-large uppercase font-bold">{heading}</p>
        <small className="text-default-500">
          {subheading} {heading}
        </small>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Skeleton className="skeleton" isLoaded={isImageLoaded}>
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src={imagelink}
            width={220}
            onLoad={() => setIsImageLoaded(true)}
          />
        </Skeleton>
        <Image />
      </CardBody>
      <CardFooter className="flex justify-center">
        <Button color="primary" onClick={() => navigate(page)}>
          View {heading}
        </Button>
      </CardFooter>
    </Card>
  );
}
