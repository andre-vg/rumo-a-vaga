"use client";

import { AddSubjectDialog } from "@/components/features/subjects/add-subject-dialog";
import { SubjectsList } from "@/components/features/subjects/subjects-list";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function MateriasPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Matérias</h1>
          <p className="mt-1 text-gray-600">
            Gerencie as matérias que você estuda
          </p>
        </div>
        <AddSubjectDialog>
          <Button className="bg-violet-600 hover:bg-violet-700">
            <Plus className="mr-2 h-4 w-4" />
            Nova Matéria
          </Button>
        </AddSubjectDialog>
      </div>

      <SubjectsList />

      {/* Hidden dialog for empty state */}
    </div>
  );
}
