"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Plus } from "lucide-react";
import { AddSubjectDialog } from "./add-subject-dialog";

export function EmptySubjects() {
  return (
    <Card className="py-12 text-center">
      <CardContent>
        <BookOpen className="mx-auto mb-4 h-12 w-12 text-gray-300" />
        <h3 className="mb-2 text-lg font-medium text-gray-900">
          Nenhuma matéria cadastrada
        </h3>
        <p className="mb-6 text-gray-600">
          Comece adicionando suas matérias para organizar seus estudos
        </p>
        <AddSubjectDialog>
          <Button className="bg-violet-600 hover:bg-violet-700">
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Primeira Matéria
          </Button>
        </AddSubjectDialog>
      </CardContent>
    </Card>
  );
}
