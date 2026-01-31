import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SubjectStat {
  subjectId: number;
  subjectName: string;
  count: number;
  totalMinutes: string;
}

interface StudiesBySubjectProps {
  subjects: SubjectStat[];
}

export function StudiesBySubject({ subjects }: StudiesBySubjectProps) {
  if (subjects.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Estudos por Matéria</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {subjects.map((item) => (
            <div
              key={item.subjectId}
              className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
            >
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-violet-600"></div>
                <span className="font-medium text-gray-900">
                  {item.subjectName}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-gray-600">{item.count} estudos</span>
                <span className="text-gray-600">{item.totalMinutes}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
