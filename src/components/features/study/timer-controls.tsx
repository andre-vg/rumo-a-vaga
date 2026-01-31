"use client";

import { Button } from "@/components/ui/button";
import { Play, Pause, Square } from "lucide-react";

interface TimerControlsProps {
  isRunning: boolean;
  isPaused: boolean;
  canStart: boolean;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
}

export function TimerControls({
  isRunning,
  isPaused,
  canStart,
  onStart,
  onPause,
  onResume,
  onStop,
}: TimerControlsProps) {
  if (!isRunning) {
    return (
      <Button
        size="lg"
        className="bg-emerald-600 px-8 hover:bg-emerald-700"
        onClick={onStart}
        disabled={!canStart}
      >
        <Play className="mr-2 h-5 w-5" />
        Iniciar
      </Button>
    );
  }

  return (
    <>
      {isPaused ? (
        <Button
          size="lg"
          className="bg-emerald-600 px-8 hover:bg-emerald-700"
          onClick={onResume}
        >
          <Play className="mr-2 h-5 w-5" />
          Continuar
        </Button>
      ) : (
        <Button size="lg" variant="outline" className="px-8" onClick={onPause}>
          <Pause className="mr-2 h-5 w-5" />
          Pausar
        </Button>
      )}
      <Button size="lg" variant="destructive" className="px-8" onClick={onStop}>
        <Square className="mr-2 h-5 w-5" />
        Parar
      </Button>
    </>
  );
}
