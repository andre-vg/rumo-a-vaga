import { Button } from "@heroui/button";
import { TimeInput } from "@heroui/date-input";
import { Form } from "@heroui/form";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@heroui/drawer";
import React from "react";
import { Checkbox } from "@heroui/checkbox";
import { Time } from "@internationalized/date";
import moment from "moment";

import { title } from "../primitives";
moment.locale("pt-br");

export default function ClockSettingsDrawer({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [time, setTime] = React.useState<Time | null>(new Time(0, 0, 0));

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    console.log(data);
  };

  return (
    <Drawer backdrop="opaque" isOpen={isOpen} onOpenChange={onOpenChange}>
      <Form className="w-full " validationBehavior="native" onSubmit={onSubmit}>
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader
                className={title({
                  size: "sm",
                  className: "flex flex-col gap-1",
                })}
              >
                Configurar Relógio
              </DrawerHeader>
              <DrawerBody>
                <TimeInput
                  granularity="second"
                  label="Quanto tempo você quer estudar?"
                  labelPlacement="outside"
                  name="time"
                  value={time}
                  onChange={(value) => {
                    setTime(value);
                  }}
                />
                <p className="text-sm text-gray-500">
                  Apx. {time && moment.duration(time).humanize()}
                </p>
                <Checkbox
                  defaultSelected
                  name="infinite"
                  onValueChange={(value) => {
                    if (value) {
                      setTime(null);
                    }
                  }}
                >
                  Quero o tempo contando até eu parar
                </Checkbox>
                <Checkbox
                  name="notify"
                  onValueChange={(value) => {
                    if (value) {
                      Notification.requestPermission().then((permission) => {
                        if (permission === "granted") {
                          new Notification("Teste", {
                            body: "Você será notificado assim quando o tempo acabar",
                            icon: "/favicon.ico",
                          });
                        }
                      });
                    }
                  }}
                >
                  Notificar quando o tempo acabar
                </Checkbox>
              </DrawerBody>
              <DrawerFooter>
                <Button
                  color="danger"
                  onPress={() => {
                    onClose();
                  }}
                >
                  Cancelar
                </Button>
                <Button color="primary" type="submit">
                  Gravar Estudo
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Form>
    </Drawer>
  );
}
