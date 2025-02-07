"use client";
import React, { useEffect } from "react";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Image } from "@heroui/image";
import { title } from "../primitives";
import { Database } from "@/database.types";
import { PlayCircle } from "lucide-react";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";

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
                classNames={{
                  img: "object-cover h-40 w-full rounded-md",
                  wrapper: "w-full !max-w-none",
                }}
                src={subject.image}
                alt={subject.name}
              />
            </CardHeader>
            <CardBody>
              <div className="flex justify-between items-center">
                <h2 className={title({ size: "md" })}>{subject.name}</h2>
                <Button
                  size="lg"
                  isIconOnly
                  onPress={() => {
                    router.push(`/study/${subject.id}`);
                  }}
                >
                  <PlayCircle size={32} className="hover:text-primary" />
                </Button>
              </div>
            </CardBody>
          </Card>
        ))}
    </>
  );
}
