"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface QuestionsSectionProps {
  questions: string;
  correctQuestions: string;
  onQuestionsChange: (value: string) => void;
  onCorrectQuestionsChange: (value: string) => void;
}

export function QuestionsSection({
  questions,
  correctQuestions,
  onQuestionsChange,
  onCorrectQuestionsChange,
}: QuestionsSectionProps) {
  return (
    <div className="border-t pt-6">
      <h3 className="mb-4 text-sm font-medium text-gray-900">
        Questões Respondidas (Opcional)
      </h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="questions">Total de Questões</Label>
          <Input
            id="questions"
            type="number"
            min="0"
            placeholder="0"
            value={questions}
            onChange={(e) => onQuestionsChange(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="correct">Acertos</Label>
          <Input
            id="correct"
            type="number"
            min="0"
            placeholder="0"
            value={correctQuestions}
            onChange={(e) => onCorrectQuestionsChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
