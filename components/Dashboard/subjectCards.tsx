"use client";
import React from "react";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Image } from "@heroui/image";
import { PlayCircle } from "lucide-react";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";

import { title } from "../primitives";

import { Database } from "@/database.types";

export default function SubjectCards({
  subjects,
}: {
  subjects: Database["public"]["Tables"]["Subject"]["Row"][];
}) {
  const router = useRouter();

  return (
    <>
      {subjects &&
        subjects.map((subject) => (
          <Card key={subject.id}>
            <CardHeader>
              <Image
                alt={subject.name}
                classNames={{
                  img: "object-cover h-40 w-full rounded-md",
                  wrapper: "w-full !max-w-none",
                }}
                src={subject.image}
              />
            </CardHeader>
            <CardBody>
              <div className="flex justify-between items-center">
                <h2 className={title({ size: "md" })}>{subject.name}</h2>
                <Button
                  isIconOnly
                  size="lg"
                  onPress={() => {
                    router.push(`/study/${subject.id}`);
                  }}
                >
                  <PlayCircle className="hover:text-primary" size={32} />
                </Button>
              </div>
            </CardBody>
          </Card>
        ))}
    </>
  );
}
