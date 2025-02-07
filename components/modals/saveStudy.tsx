"use client";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Form } from "@heroui/form";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { useAsyncList } from "@react-stately/data";
import { supabase } from "@/utils/supabase/client";
import { title } from "../primitives";
import { useSession } from "next-auth/react";
import { pexels } from "@/utils/pexels";
import { DateInput, TimeInput } from "@heroui/date-input";
import {
  getLocalTimeZone,
  parseDate,
  Time,
  today,
} from "@internationalized/date";
import MethodAutoComplete from "../Study/Form/methodAutoComplete";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import moment from "moment";

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
                      label="Tempo de estudo"
                      defaultValue={studyTime}
                      granularity="second"
                      name="time"
                    />

                    <TimeInput
                      label="Tempo de pausa"
                      defaultValue={new Time(0, 0, 0)}
                      granularity="second"
                      name="pauseTime"
                    />
                  </div>

                  <DateInput
                    label="Data de hoje"
                    defaultValue={parseDate(
                      today(getLocalTimeZone()).toString(),
                    )}
                    name="date"
                  />

                  <Autocomplete
                    label="Período de estudo"
                    name="period"
                    isRequired
                  >
                    <AutocompleteItem value="Manhã">Manhã</AutocompleteItem>
                    <AutocompleteItem value="Tarde">Tarde</AutocompleteItem>
                    <AutocompleteItem value="Noite">Noite</AutocompleteItem>
                  </Autocomplete>

                  <MethodAutoComplete />

                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      type="number"
                      label="Quantidade de questões"
                      name="questions"
                      min={0}
                      defaultValue="0"
                    />

                    <Input
                      type="number"
                      label="Quantidade de acertos"
                      name="correctQuestions"
                      min={0}
                      defaultValue="0"
                    />
                  </div>

                  <Input
                    label="Qual foi o assunto de hoje?"
                    placeholder="Direito Penal"
                    name="topic"
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
