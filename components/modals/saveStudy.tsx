"use client";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { Button } from "@heroui/button";
import { DateInput, TimeInput } from "@heroui/date-input";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import {
  getLocalTimeZone,
  parseDate,
  Time,
  today,
} from "@internationalized/date";
import moment from "moment";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import MethodAutoComplete from "../Study/Form/methodAutoComplete";
import { title } from "../primitives";

import { supabase } from "@/utils/supabase/client";

export default function SaveStudy({
  isOpen,
  onOpenChange,
  studyTime,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  studyTime: Time;
}) {
  const session = useSession();
  const { subjectId } = useParams();
  const router = useRouter();

  const onSubmit = async (e: any) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));

    //get secons
    data.time = moment.duration(data.time.toString()).asSeconds().toString();
    data.pauseTime = moment
      .duration(data.pauseTime.toString())
      .asSeconds()
      .toString();

    await supabase()
      .from("Study")
      .insert([
        {
          userId: session.data?.user?.email,
          subjectId: Number(subjectId),
          ...data,
        },
      ])
      .then((i) => {
        if (i.error) {
          toast.error("Erro ao salvar estudo", {
            description: i.error.message,
          });
        } else {
          toast.success("Estudo salvo com sucesso!", {
            description: getDescription(
              Number(data.questions),
              Number(data.correctQuestions),
            ),
          });
          onOpenChange(false);
          router.push("/dashboard");
        }
      });
  };

  const getDescription = async (questions: number, correct: number) => {
    const percentage = (correct / questions) * 100;

    if (percentage >= 90) {
      return "Você está indo muito bem! Continue assim!";
    } else if (percentage >= 70) {
      return "Muito bem! Continue estudando!";
    } else if (percentage >= 50) {
      return "Você está no caminho certo!";
    } else if (percentage >= 30) {
      return "Estude mais um pouco!";
    } else {
      return "Estude mais";
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <Form
          className="w-full "
          validationBehavior="native"
          onSubmit={onSubmit}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader
                  className={title({
                    size: "sm",
                    className: "flex flex-col gap-1",
                  })}
                >
                  Registrar estudo
                </ModalHeader>
                <ModalBody className="grid gap-3">
                  <div className="grid grid-cols-2 gap-3">
                    <TimeInput
                      defaultValue={studyTime}
                      granularity="second"
                      label="Tempo de estudo"
                      name="time"
                    />

                    <TimeInput
                      defaultValue={new Time(0, 0, 0)}
                      granularity="second"
                      label="Tempo de pausa"
                      name="pauseTime"
                    />
                  </div>

                  <DateInput
                  //@ts-ignore
                    defaultValue={parseDate(
                      today(getLocalTimeZone()).toString(),
                    )}
                    label="Data de hoje"
                    name="date"
                  />

                  <Autocomplete
                    isRequired
                    label="Período de estudo"
                    name="period"
                  >
                    <AutocompleteItem value="Manhã">Manhã</AutocompleteItem>
                    <AutocompleteItem value="Tarde">Tarde</AutocompleteItem>
                    <AutocompleteItem value="Noite">Noite</AutocompleteItem>
                  </Autocomplete>

                  <MethodAutoComplete />

                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      defaultValue="0"
                      label="Quantidade de questões"
                      min={0}
                      name="questions"
                      type="number"
                    />

                    <Input
                      defaultValue="0"
                      label="Quantidade de acertos"
                      min={0}
                      name="correctQuestions"
                      type="number"
                    />
                  </div>

                  <Input
                    label="Qual foi o assunto de hoje?"
                    name="topic"
                    placeholder="Direito Penal"
                  />
                </ModalBody>
                <ModalFooter>
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
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Form>
      </Modal>
    </>
  );
}
