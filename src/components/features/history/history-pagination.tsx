"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HistoryPaginationProps {
  offset: number;
  limit: number;
  studiesCount: number;
  onPrevious: () => void;
  onNext: () => void;
}

export function HistoryPagination({
  offset,
  limit,
  studiesCount,
  onPrevious,
  onNext,
}: HistoryPaginationProps) {
  return (
    <div className="mt-6 flex items-center justify-between">
      <Button variant="outline" onClick={onPrevious} disabled={offset === 0}>
        <ChevronLeft className="mr-2 h-4 w-4" />
        Anterior
      </Button>
      <span className="text-sm text-gray-600">
        Página {Math.floor(offset / limit) + 1}
      </span>
      <Button
        variant="outline"
        onClick={onNext}
        disabled={studiesCount < limit}
      >
        Próximo
        <ChevronRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}
