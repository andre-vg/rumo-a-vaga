"use client";

interface TimerDisplayProps {
  seconds: number;
  pauseSeconds?: number;
  isRunning: boolean;
}

export function TimerDisplay({
  seconds,
  pauseSeconds = 0,
  isRunning,
}: TimerDisplayProps) {
  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-8 font-mono text-7xl font-bold text-gray-900 sm:text-8xl">
        {formatTime(seconds)}
      </div>

      {pauseSeconds > 0 && (
        <div className="mb-4 text-lg text-gray-500">
          Tempo de pausa: {formatTime(pauseSeconds)}
        </div>
      )}
    </div>
  );
}
