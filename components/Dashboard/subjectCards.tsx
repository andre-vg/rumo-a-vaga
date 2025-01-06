"use client";
import React, { useEffect } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { pexels } from "@/utils/pexels";
import { title } from "../primitives";
import { Database } from "@/database.types";

export default function SubjectCards({
  subjects,
}: {
  subjects: Database["public"]["Tables"]["Subject"]["Row"][];
}) {
  return (
    <>
      {subjects &&
        subjects.map((subject) => (
          <Card key={subject.id}>
            <CardHeader>
              <Image
                classNames={{
                  img: "object-cover h-40 w-full",
                  wrapper: "w-full !max-w-none",
                }}
                src={subject.image}
                alt={subject.name}
              />
            </CardHeader>
            <CardBody>
              <h2 className={title({ size: "md" })}>{subject.name}</h2>
            </CardBody>
          </Card>
        ))}
    </>
  );
}
