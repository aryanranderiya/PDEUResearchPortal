import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
  Button,
} from "@nextui-org/react";

export default function CardComponent({ heading, subheading, imagelink }) {
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
          width={260}
        />
        <Image />
      </CardBody>
      <Divider></Divider>
      <CardFooter className="flex justify-center">
        <Button color="primary">View {heading}</Button>
      </CardFooter>
    </Card>
  );
}
