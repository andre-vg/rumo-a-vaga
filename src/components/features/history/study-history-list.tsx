"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Clock, Target, BookOpen } from "lucide-react";

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

interface StudyHistoryListProps {
  studies: Study[];
  formatMinutes: (minutes: number) => string;
  onDelete: (id: number) => void;
  isDeleting: boolean;
}

function StudyHistoryItem({
  study,
  formatMinutes,
  onDelete,
  isDeleting,
}: {
  study: Study;
  formatMinutes: (minutes: number) => string;
  onDelete: (id: number) => void;
  isDeleting: boolean;
}) {
  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-100 to-emerald-100">
              <BookOpen className="h-6 w-6 text-violet-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {study.subjectName}
              </h3>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-gray-500">
                {study.method && (
                  <span className="rounded-full bg-violet-100 px-2 py-0.5 text-xs text-violet-700">
                    {study.method}
                  </span>
                )}
                {study.period && (
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs text-emerald-700">
                    {study.period}
                  </span>
                )}
                {study.topic && (
                  <span className="text-gray-400">• {study.topic}</span>
                )}
              </div>
              <p className="mt-2 text-sm text-gray-400">
                {study.date ?? "Data não informada"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 sm:text-right">
            <div>
              <div className="flex items-center gap-2 text-gray-900">
                <Clock className="h-4 w-4 text-violet-600" />
                <span className="font-semibold">
                  {formatMinutes(study.minutes ?? 0)}
                </span>
              </div>
              {(study.pauseMinutes ?? 0) > 0 && (
                <p className="mt-0.5 text-xs text-gray-400">
                  +{formatMinutes(study.pauseMinutes ?? 0)} de pausa
                </p>
              )}
            </div>

            {study.questions && (
              <div className="text-right">
                <div className="flex items-center gap-2 text-gray-900">
                  <Target className="h-4 w-4 text-emerald-600" />
                  <span className="font-semibold">
                    {study.correctQuestions}/{study.questions}
                  </span>
                </div>
                {study.questions > 0 && (
                  <p className="mt-0.5 text-xs text-gray-400">
                    {Math.round(
                      ((study.correctQuestions ?? 0) / study.questions) * 100,
                    )}{" "}
                    % acerto
                  </p>
                )}
              </div>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gray-400 hover:bg-red-50 hover:text-red-600"
              onClick={() => onDelete(study.id)}
              disabled={isDeleting}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function StudyHistoryList({
  studies,
  formatMinutes,
  onDelete,
  isDeleting,
}: StudyHistoryListProps) {
  return (
    <div className="space-y-4">
      {studies.map((study) => (
        <StudyHistoryItem
          key={study.id}
          study={study}
          formatMinutes={formatMinutes}
          onDelete={onDelete}
          isDeleting={isDeleting}
        />
      ))}
    </div>
  );
}
