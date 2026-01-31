"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save, Loader2 } from "lucide-react";

import { TimerDisplay } from "@/components/features/study/timer-display";
import { TimerControls } from "@/components/features/study/timer-controls";
import { StudyForm } from "@/components/features/study/study-form";
import { QuestionsSection } from "@/components/features/study/questions-section";
import { CardTitle } from "@/components/ui/card";

interface Subject {
  id: number;
  name: string;
}

interface StudyMethod {
  value: string;
  label: string;
}

interface StudyPeriod {
  value: string;
  label: string;
}

interface StudyTimerClientProps {
  subjects: Subject[];
  studyMethods: StudyMethod[];
  studyPeriods: StudyPeriod[];
}

export function StudyTimerClient({
  subjects,
  studyMethods,
  studyPeriods,
}: StudyTimerClientProps) {
  const router = useRouter();
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [pauseSeconds, setPauseSeconds] = useState(0);

  const [subjectId, setSubjectId] = useState<string>("");
  const [period, setPeriod] = useState<string>("");
  const [method, setMethod] = useState<string>("");
  const [topic, setTopic] = useState<string>("");
  const [questions, setQuestions] = useState<string>("");
  const [correctQuestions, setCorrectQuestions] = useState<string>("");

  const createStudyMutation = api.study.create.useMutation({
    onSuccess: () => {
      router.push("/dashboard");
    },
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && !isPaused) {
      interval = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    } else if (isPaused) {
      interval = setInterval(() => {
        setPauseSeconds((s) => s + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, isPaused]);

  const handleStart = useCallback(() => {
    if (!subjectId) return;
    setIsRunning(true);
    setIsPaused(false);
  }, [subjectId]);

  const handlePause = useCallback(() => {
    setIsPaused(true);
  }, []);

  const handleResume = useCallback(() => {
    setIsPaused(false);
  }, []);

  const handleStop = useCallback(() => {
    setIsRunning(false);
    setIsPaused(false);
  }, []);

  const handleSave = useCallback(() => {
    if (!subjectId || seconds === 0) return;

    const studyMinutes = Math.floor(seconds / 60);
    const pauseMinutes = Math.floor(pauseSeconds / 60);

    createStudyMutation.mutate({
      subjectId: parseInt(subjectId),
      period: period || undefined,
      method: method || undefined,
      topic: topic || undefined,
      questions: questions ? parseInt(questions) : undefined,
      correctQuestions: correctQuestions
        ? parseInt(correctQuestions)
        : undefined,
      minutes: studyMinutes,
      pauseMinutes: pauseMinutes,
    });
  }, [
    subjectId,
    period,
    method,
    topic,
    questions,
    correctQuestions,
    seconds,
    pauseSeconds,
    createStudyMutation,
  ]);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Novo Estudo</h1>
        <p className="mt-1 text-gray-600">
          Escolha uma matéria e inicie o timer para começar a estudar
        </p>
      </div>

      <Card className="border-2 border-violet-100">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center">
            <TimerDisplay
              seconds={seconds}
              pauseSeconds={pauseSeconds}
              isRunning={isRunning}
            />

            <div className="flex gap-4">
              <TimerControls
                isRunning={isRunning}
                isPaused={isPaused}
                canStart={!!subjectId}
                onStart={handleStart}
                onPause={handlePause}
                onResume={handleResume}
                onStop={handleStop}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-6 pt-6">
          <CardTitle>Detalhes do Estudo</CardTitle>

          <StudyForm
            subjects={subjects}
            methods={studyMethods}
            periods={studyPeriods}
            subjectId={subjectId}
            period={period}
            method={method}
            topic={topic}
            questions={questions}
            correctQuestions={correctQuestions}
            isRunning={isRunning}
            onSubjectChange={setSubjectId}
            onPeriodChange={setPeriod}
            onMethodChange={setMethod}
            onTopicChange={setTopic}
            onQuestionsChange={setQuestions}
            onCorrectQuestionsChange={setCorrectQuestions}
          />

          <QuestionsSection
            questions={questions}
            correctQuestions={correctQuestions}
            onQuestionsChange={setQuestions}
            onCorrectQuestionsChange={setCorrectQuestions}
          />

          {seconds > 0 && !isRunning && (
            <div className="flex justify-end pt-4">
              <Button
                size="lg"
                className="bg-violet-600 hover:bg-violet-700"
                onClick={handleSave}
                disabled={createStudyMutation.isPending || !subjectId}
              >
                {createStudyMutation.isPending ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <Save className="mr-2 h-5 w-5" />
                )}
                Salvar Estudo
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
