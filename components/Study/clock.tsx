"use client";
import React from "react";
import { CircularProgress } from "@nextui-org/progress";
import { Button } from "@nextui-org/button";
import { AnimatePresence, motion as m } from "framer-motion";
import SaveStudy from "../modals/saveStudy";
import { useDisclosure } from "@nextui-org/modal";
import { Time } from "@internationalized/date";

export default function Clock() {
  const [minutes, setMinutes] = React.useState(0);
  const [hours, setHours] = React.useState(0);
  const [seconds, setSeconds] = React.useState(0);
  const [totalSeconds, setTotalSeconds] = React.useState(0);
  const [isRunning, setIsRunning] = React.useState(false);
  const workerRef = React.useRef<Worker | null>(null);

  const { isOpen, onOpenChange, onOpen } = useDisclosure();

  const startClock = () => {
    setIsRunning(true);
    if (workerRef.current) {
      workerRef.current.postMessage("start");
    }
  };

  const stopClock = () => {
    setIsRunning(false);
    if (workerRef.current) {
      workerRef.current.postMessage("stop");
    }
  };

  const resetClock = () => {
    setSeconds(0);
    setMinutes(0);
    setHours(0);
    setTotalSeconds(0);
    setIsRunning(false);

    if (workerRef.current) {
      workerRef.current.postMessage("reset");
    }
  };

  React.useEffect(() => {
    workerRef.current = new Worker(
      new URL("@/utils/clockWorker.js", import.meta.url)
    );
    workerRef.current.onmessage = (event) => {
      setTotalSeconds(event.data);
    };

    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
  }, []);

  React.useEffect(() => {
    setSeconds(totalSeconds % 60);
    setMinutes(Math.floor((totalSeconds / 60) % 60));
    setHours(Math.floor(totalSeconds / 3600));
  }, [totalSeconds]);

  return (
    <div className="grid place-items-center mt-8">
      <CircularProgress
        classNames={{
          svg: "w-96 h-96 drop-shadow-md",
          indicator: "stroke-primary",
          track: "stroke-primary/10",
          value: "text-3xl font-semibold text-white",
        }}
        label={
          <span className="text-5xl font-semibold text-white">
            {hours.toString().padStart(2, "0")} :{" "}
            {minutes.toString().padStart(2, "0")} :{" "}
            {seconds.toString().padStart(2, "0")}
          </span>
        }
        formatOptions={{ style: "decimal" }}
        strokeWidth={3}
        value={seconds}
        maxValue={60}
      />
      <div className="flex gap-4 mt-4">
        <Button
          size="lg"
          color="default"
          onPress={resetClock}
          isDisabled={
            isRunning || (hours === 0 && minutes === 0 && seconds === 0)
          }
        >
          Reiniciar
        </Button>
        <Button
          size="lg"
          color="success"
          onPress={startClock}
          isDisabled={isRunning}
        >
          Start
        </Button>
        <Button
          size="lg"
          color="danger"
          onPress={stopClock}
          isDisabled={!isRunning}
        >
          Parar
        </Button>
      </div>
      <AnimatePresence>
        {seconds >= 5 && (
          <m.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="mt-4"
          >
            <Button
              color="primary"
              size="lg"
              onPress={() => {
                stopClock();
                onOpen();
              }}
            >
              Finalizar estudo
            </Button>
          </m.div>
        )}
      </AnimatePresence>
      <SaveStudy
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        studyTime={
          new Time(hours, minutes, seconds)
        }
      />
    </div>
  );
}
