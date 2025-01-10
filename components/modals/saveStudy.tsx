import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Form } from "@nextui-org/form";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import { useAsyncList } from "@react-stately/data";
import { supabase } from "@/utils/supabase/client";
import { title } from "../primitives";
import { useSession } from "next-auth/react";
import { pexels } from "@/utils/pexels";
import { DateInput, TimeInput } from "@nextui-org/date-input";
import {
  getLocalTimeZone,
  parseDate,
  Time,
  today,
} from "@internationalized/date";
import MethodAutoComplete from "../Study/Form/methodAutoComplete";

type SWCharacter = {
  id: number;
  created_at: string;
  created_by: string;
  name: string;
};

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

  const onSubmit = async (e: any) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));
    console.log(data);

    // let subject = await supabase()
    //   .from("Subject")
    //   .select()
    //   .eq("name", data.subject);

    // await supabase()
    //   .from("ta_User_Subject")
    //   .insert({
    //     userId: session.data?.user?.email,
    //     subjectId: subject.data ? subject.data[0].id : null,
    //   });
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
                    isReadOnly
                    defaultValue={parseDate(
                      today(getLocalTimeZone()).toString()
                    )}
                    name="date"
                  />

                  <Autocomplete label="Período de estudo" name="period">
                    <AutocompleteItem value="Manhã">Manhã</AutocompleteItem>
                    <AutocompleteItem value="Tarde">Tarde</AutocompleteItem>
                    <AutocompleteItem value="Noite">Noite</AutocompleteItem>
                  </Autocomplete>

                  <MethodAutoComplete />

                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      type="number"
                      label="Quantidade de questões"
                      name="nQuestions"
                      min={0}
                    />

                    <Input
                      type="number"
                      label="Quantidade de acertos"
                      name="nCorrectQuestions"
                      min={0}
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
                    Submit
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

function AddUnknowSubject({
  subjectName,
  list,
}: {
  subjectName: string;
  list: ReturnType<typeof useAsyncList>;
}): JSX.Element {
  const addSubject = async () => {
    await supabase()
      .from("Subject")
      .insert([{ name: subjectName, image: await getPhoto() }])
      .then(() => {
        list.reload();
      });
  };

  const getPhoto = async () => {
    const res = await pexels.photos.search({ query: subjectName });
    if ("photos" in res && res.photos.length > 0) {
      return res.photos[0].src.medium;
    } else {
      let aux = await pexels.photos.random();
      // @ts-ignore
      return aux.src.medium;
    }
  };

  return (
    <div className="p-2 text-center">
      <p className="text-gray-500">Matéria não encontrada!</p>
      <Button onPress={addSubject} className="mt-2" size="sm" color="secondary">
        Adicionar {subjectName}
      </Button>
    </div>
  );
}
