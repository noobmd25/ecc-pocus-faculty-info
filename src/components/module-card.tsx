import { Button, Card, CardBody, CardFooter, Link } from "@heroui/react";
import type { ModuleLink } from "@/data/modules";

export function ModuleCard({ module }: { module: ModuleLink }) {
  const isPosted = module.href !== "#";

  return (
    <Card shadow="sm" radius="lg" className="h-full">
      <CardBody className="gap-2 px-5 pt-5">
        <h3 className="font-sans text-base font-bold tracking-tight">
          {module.title}
        </h3>
        <p className="font-baskerville text-sm leading-[1.75] text-foreground/90">
          {module.description}
        </p>
      </CardBody>
      <CardFooter className="px-5 pb-5 pt-2">
        {isPosted ? (
          <Button
            as={Link}
            href={module.href}
            size="sm"
            color="primary"
            variant="bordered"
            radius="sm"
            className="font-sans font-semibold"
          >
            Open module
          </Button>
        ) : (
          <span className="font-sans text-xs font-semibold uppercase tracking-[0.11em] text-default-600">
            Not posted yet
          </span>
        )}
      </CardFooter>
    </Card>
  );
}
