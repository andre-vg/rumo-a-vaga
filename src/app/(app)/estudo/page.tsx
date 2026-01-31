import { api } from "@/trpc/server";
import { NoSubjectsWarning } from "@/components/features/study/no-subjects-warning";
import { StudyTimerClient } from "@/components/features/study/study-timer-client";

const studyMethods = [
  { value: "revisao", label: "Revisão" },
  { value: "simulado", label: "Simulado" },
  { value: "estudo_teorico", label: "Estudo Teórico" },
  { value: "resolucao", label: "Resolução de Questões" },
  { value: "leitura", label: "Leitura" },
  { value: "videoaula", label: "Videoaula" },
];

const studyPeriods = [
  { value: "manha", label: "Manhã" },
  { value: "tarde", label: "Tarde" },
  { value: "noite", label: "Noite" },
];

export default async function EstudoPage() {
  const subjects = await api.subject.getAll();

  if (!subjects || subjects.length === 0) {
    return <NoSubjectsWarning />;
  }

  return (
    <StudyTimerClient
      subjects={subjects}
      studyMethods={studyMethods}
      studyPeriods={studyPeriods}
    />
  );
}
