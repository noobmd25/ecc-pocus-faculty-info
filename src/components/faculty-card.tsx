import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
  Link,
} from "@heroui/react";
import type { FacultyMember } from "@/data/faculty";

export function FacultyCard({ member }: { member: FacultyMember }) {
  return (
    <Card shadow="sm" radius="lg" className="h-full">
      <CardHeader className="gap-4 px-5 pt-5">
        <Avatar
          name={member.name}
          src={member.photo}
          size="lg"
          color="primary"
          isBordered
          className="shrink-0"
        />
        <div className="min-w-0">
          <p className="truncate font-sans text-base font-bold tracking-tight">
            {member.name}
          </p>
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.11em] text-secondary">
            {member.role}
          </p>
        </div>
      </CardHeader>
      <CardBody className="gap-4 px-5">
        <p className="font-baskerville text-sm leading-[1.75] text-foreground">
          {member.bio}
        </p>
        <div className="flex flex-wrap gap-2">
          {member.focus.map((area) => (
            <Chip
              key={area}
              size="sm"
              variant="flat"
              color="primary"
              className="font-sans font-semibold"
            >
              {area}
            </Chip>
          ))}
        </div>
      </CardBody>
      <Divider />
      <CardFooter className="justify-between px-5 py-4">
        <span className="font-mono text-[11px] tracking-tight text-default-600">
          {member.credentials}
        </span>
        {member.email && (
          <Button
            as={Link}
            href={`mailto:${member.email}`}
            size="sm"
            variant="bordered"
            color="primary"
            radius="sm"
            className="font-sans font-semibold"
          >
            Contact
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
