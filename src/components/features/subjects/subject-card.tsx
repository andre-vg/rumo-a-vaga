"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/trpc/react";
import { BookOpen, Trash2 } from "lucide-react";
import Link from "next/link";

interface Subject {
  id: number;
  name: string;
  createdAt: string;
}

interface SubjectCardProps {
  subject: Subject; 
}

export function SubjectCard({ subject }: SubjectCardProps) {
  const utils = api.useUtils();

  const deleteMutation = api.subject.delete.useMutation({
    onSuccess: async() => {
      await utils.subject.getAll.invalidate();
    },
  });
  
  const handleDelete = (id: number) => {
    if (confirm("Tem certeza que deseja remover esta matéria?")) {
      deleteMutation.mutate({ id });
    }
  };

  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-violet-100 to-emerald-100">
              <BookOpen className="h-5 w-5 text-violet-600" />
            </div>
            <CardTitle className="text-lg font-semibold text-gray-900">
              {subject.name}
            </CardTitle>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-400 hover:bg-red-50 hover:text-red-600"
            onClick={() => handleDelete(subject.id)}
            disabled={deleteMutation.isPending}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500">
          Criada em {new Date(subject.createdAt).toLocaleDateString("pt-BR")}
        </p>
      </CardContent>
      <CardFooter>
        <Link className="w-full" href={`/estudo?subject=${subject.id}`}>
          <Button className="w-full">Começar estudo</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
