"use client";

import { SubjectCard } from "./subject-card";
import { EmptySubjects } from "./empty-subjects";
import { api } from "@/trpc/react";

export function SubjectsList() {
  const { data: subjects, isLoading } = api.subject.getAll.useQuery();

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-48 animate-pulse rounded-lg bg-gray-200"
          />
        ))}
      </div>
    );
  }

  if (!subjects || subjects.length === 0) {
    return <EmptySubjects />;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {subjects.map((subject) => (
        <SubjectCard key={subject.id} subject={subject} />
      ))}
    </div>
  );
}
