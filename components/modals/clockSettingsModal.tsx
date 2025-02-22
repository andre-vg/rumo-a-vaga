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
import React, { useEffect } from "react";
import { title } from "../primitives";
import { Checkbox } from "@heroui/checkbox";
import { Time } from "@internationalized/date";
import moment from "moment";
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
    <Drawer isOpen={isOpen} onOpenChange={onOpenChange} backdrop="opaque">
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
                  label="Quanto tempo você quer estudar?"
                  labelPlacement="outside"
                  value={time}
                  onChange={(value) => {
                    setTime(value);
                  }}
                  granularity="second"
                  name="time"
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
