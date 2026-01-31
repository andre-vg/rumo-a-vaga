import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, BookOpen } from "lucide-react";

export function NoSubjectsWarning() {
  return (
    <div className="mx-auto max-w-2xl">
      <Card className="py-12 text-center">
        <CardContent>
          <AlertCircle className="mx-auto mb-4 h-12 w-12 text-amber-500" />
          <h2 className="mb-2 text-xl font-semibold text-gray-900">
            Nenhuma matéria cadastrada
          </h2>
          <p className="mb-6 text-gray-600">
            Você precisa adicionar pelo menos uma matéria antes de começar a
            estudar.
          </p>
          <Link href="/materias">
            <Button className="bg-violet-600 hover:bg-violet-700">
              <BookOpen className="mr-2 h-4 w-4" />
              Cadastrar Matérias
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
