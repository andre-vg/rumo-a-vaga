import { api } from "@/trpc/server";
import { StudyHistoryClient } from "@/components/features/history/study-history-client";

export default async function HistoricoPage() {
  const studies = await api.study.getAll({ limit: 10, offset: 0 });

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Histórico</h1>
          <p className="mt-1 text-gray-600">
            Visualize todos os seus estudos registrados
          </p>
        </div>
      </div>

      <StudyHistoryClient initialStudies={studies} />
    </div>
  );
}
