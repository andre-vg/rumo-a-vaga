"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

interface StudyFormProps {
  subjects: Subject[];
  methods: StudyMethod[];
  periods: StudyPeriod[];
  subjectId: string;
  period: string;
  method: string;
  topic: string;
  questions: string;
  correctQuestions: string;
  isRunning: boolean;
  onSubjectChange: (value: string) => void;
  onPeriodChange: (value: string) => void;
  onMethodChange: (value: string) => void;
  onTopicChange: (value: string) => void;
  onQuestionsChange: (value: string) => void;
  onCorrectQuestionsChange: (value: string) => void;
}

export function StudyForm({
  subjects,
  methods,
  periods,
  subjectId,
  period,
  method,
  topic,
  questions,
  correctQuestions,
  isRunning,
  onSubjectChange,
  onPeriodChange,
  onMethodChange,
  onTopicChange,
  onQuestionsChange,
  onCorrectQuestionsChange,
}: StudyFormProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {/* Subject */}
      <div className="space-y-2">
        <Label htmlFor="subject">
          Matéria <span className="text-red-500">*</span>
        </Label>
        <Select
          value={subjectId}
          onValueChange={onSubjectChange}
          disabled={isRunning}
        >
          <SelectTrigger id="subject">
            <SelectValue placeholder="Selecione uma matéria" />
          </SelectTrigger>
          <SelectContent>
            {subjects.map((subject) => (
              <SelectItem key={subject.id} value={subject.id.toString()}>
                {subject.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Period */}
      <div className="space-y-2">
        <Label htmlFor="period">Período</Label>
        <Select
          value={period}
          onValueChange={onPeriodChange}
          disabled={isRunning}
        >
          <SelectTrigger id="period">
            <SelectValue placeholder="Selecione o período" />
          </SelectTrigger>
          <SelectContent>
            {periods.map((p) => (
              <SelectItem key={p.value} value={p.value}>
                {p.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Method */}
      <div className="space-y-2">
        <Label htmlFor="method">Método de Estudo</Label>
        <Select
          value={method}
          onValueChange={onMethodChange}
          disabled={isRunning}
        >
          <SelectTrigger id="method">
            <SelectValue placeholder="Selecione o método" />
          </SelectTrigger>
          <SelectContent>
            {methods.map((m) => (
              <SelectItem key={m.value} value={m.value}>
                {m.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Topic */}
      <div className="space-y-2">
        <Label htmlFor="topic">Tópico/Assunto</Label>
        <Input
          id="topic"
          placeholder="Ex: Álgebra, Gramática, etc."
          value={topic}
          onChange={(e) => onTopicChange(e.target.value)}
          disabled={isRunning}
        />
      </div>
    </div>
  );
}
