"use client";

import { useState } from "react";
import { api } from "@/trpc/react";

import { StudyHistoryList } from "./study-history-list";
import { EmptyHistory } from "./empty-history";
import { HistoryPagination } from "./history-pagination";

interface Study {
  id: number;
  subjectId: number;
  subjectName: string;
  method: string | null;
  period: string | null;
  topic: string | null;
  minutes: number | null;
  pauseMinutes: number | null;
  questions: number | null;
  correctQuestions: number | null;
  date: string | null;
  createdAt: string;
}

function formatMinutes(minutes: number): string {
  if (minutes < 60) return `${minutes}min`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (remainingMinutes === 0) return `${hours}h`;
  return `${hours}h ${remainingMinutes}min`;
}

interface StudyHistoryClientProps {
  initialStudies: Study[];
}

export function StudyHistoryClient({
  initialStudies,
}: StudyHistoryClientProps) {
  const [offset, setOffset] = useState(0);
  const limit = 10;

  const { data: studies, refetch } = api.study.getAll.useQuery(
    { limit, offset },
    { initialData: initialStudies },
  );

  const deleteMutation = api.study.delete.useMutation({
    onSuccess: () => {
      void refetch();
    },
  });

  const handleDelete = (id: number) => {
    if (confirm("Tem certeza que deseja excluir este estudo?")) {
      deleteMutation.mutate({ id });
    }
  };

  const handlePrevious = () => {
    setOffset((o) => Math.max(0, o - limit));
  };

  const handleNext = () => {
    setOffset((o) => o + limit);
  };

  if (!studies || studies.length === 0) {
    return <EmptyHistory />;
  }

  return (
    <>
      <StudyHistoryList
        studies={studies}
        formatMinutes={formatMinutes}
        onDelete={handleDelete}
        isDeleting={deleteMutation.isPending}
      />
      <HistoryPagination
        offset={offset}
        limit={limit}
        studiesCount={studies.length}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </>
  );
}
