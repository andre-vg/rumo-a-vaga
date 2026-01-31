import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock } from "lucide-react";

interface RecentStudy {
  id: number;
  subjectName: string;
  method: string | null;
  date: string | null;
  minutes: number | null;
  questions: number | null;
  correctQuestions: number | null;
}

interface RecentStudiesProps {
  studies: RecentStudy[];
  formatMinutes: (minutes: number | null) => string;
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "Data não informada";
  return new Date(dateStr).toLocaleDateString("pt-BR");
}

export function RecentStudies({ studies, formatMinutes }: RecentStudiesProps) {
  const hasStudies = studies.length > 0;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Estudos Recentes</CardTitle>
        <Link href="/historico">
          <Button variant="outline" size="sm">
            Ver Todos
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        {hasStudies ? (
          <div className="space-y-3">
            {studies.map((study) => (
              <div
                key={study.id}
                className="flex items-center justify-between rounded-lg bg-gray-50 p-4"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-violet-100 to-emerald-100">
                    <BookOpen className="h-5 w-5 text-violet-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {study.subjectName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {study.method && `${study.method} • `}
                      {formatDate(study.date)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">
                    {formatMinutes(study.minutes)}
                  </p>
                  {study.questions && (
                    <p className="text-sm text-gray-500">
                      {study.correctQuestions}/{study.questions} acertos
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center">
            <BookOpen className="mx-auto mb-4 h-12 w-12 text-gray-300" />
            <p className="text-gray-600">Nenhum estudo registrado ainda</p>
            <Link href="/estudo" className="mt-4 inline-block">
              <Button className="bg-violet-600 hover:bg-violet-700">
                <Clock className="mr-2 h-4 w-4" />
                Iniciar Primeiro Estudo
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
