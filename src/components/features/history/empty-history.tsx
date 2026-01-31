"use client";

import { Card, CardContent } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

export function EmptyHistory() {
  return (
    <Card className="py-12 text-center">
      <CardContent>
        <BookOpen className="mx-auto mb-4 h-12 w-12 text-gray-300" />
        <h3 className="mb-2 text-lg font-medium text-gray-900">
          Nenhum estudo registrado
        </h3>
        <p className="mb-6 text-gray-600">
          Comece estudando e seus registros aparecerão aqui
        </p>
      </CardContent>
    </Card>
  );
}
