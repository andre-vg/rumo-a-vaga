"use client";
import { Button } from "@heroui/button";
import { useDisclosure } from "@heroui/modal";
import { CircularProgress } from "@heroui/progress";
import { Time } from "@internationalized/date";
import { AnimatePresence, motion as m } from "framer-motion";
import React from "react";

import ClockSettingsDrawer from "../modals/clockSettingsModal";
import SaveStudy from "../modals/saveStudy";

export default function Clock() {
  const [minutes, setMinutes] = React.useState(0);
  const [hours, setHours] = React.useState(0);
  const [seconds, setSeconds] = React.useState(0);
  const [totalSeconds, setTotalSeconds] = React.useState(0);
  const [isRunning, setIsRunning] = React.useState(false);
  const workerRef = React.useRef<Worker | null>(null);

  const { isOpen, onOpenChange, onOpen } = useDisclosure();
  const clockSettings = useDisclosure();

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
      new URL("@/utils/clockWorker.js", import.meta.url),
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
      {/* <div className="flex justify-end w-1/2">
        <Button isIconOnly variant="light" onPress={clockSettings.onOpen}>
          <Settings2 size={32} />
        </Button>
      </div> */}
      <CircularProgress
        classNames={{
          svg: "w-96 h-96 drop-shadow-md",
          indicator: "stroke-primary",
          track: "stroke-primary/10",
          value: "text-3xl font-semibold text-white",
        }}
        formatOptions={{ style: "decimal" }}
        label={
          <span className="text-5xl font-semibold text-white">
            {hours.toString().padStart(2, "0")} :{" "}
            {minutes.toString().padStart(2, "0")} :{" "}
            {seconds.toString().padStart(2, "0")}
          </span>
        }
        maxValue={60}
        strokeWidth={3}
        value={seconds}
      />
      <div className="flex gap-4 mt-4">
        <Button
          color="default"
          isDisabled={
            isRunning || (hours === 0 && minutes === 0 && seconds === 0)
          }
          size="lg"
          onPress={resetClock}
        >
          Reiniciar
        </Button>
        <Button
          color="success"
          isDisabled={isRunning}
          size="lg"
          onPress={startClock}
        >
          Start
        </Button>
        <Button
          color="danger"
          isDisabled={!isRunning}
          size="lg"
          onPress={stopClock}
        >
          Parar
        </Button>
      </div>
      <AnimatePresence>
        {seconds >= 5 && (
          <m.div
            animate={{ opacity: 1, x: 0 }}
            className="mt-4"
            exit={{ opacity: 0, x: 50 }}
            initial={{ opacity: 0, x: -50 }}
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
        studyTime={new Time(hours, minutes, seconds)}
        onOpenChange={onOpenChange}
      />
      <ClockSettingsDrawer {...clockSettings} />
    </div>
  );
}
