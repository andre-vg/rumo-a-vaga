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
import { toast } from "sonner";
import { useState } from "react";

type SWCharacter = {
  id: number;
  created_at: string;
  created_by: string;
  name: string;
};

export default function AddSubjectModal({
  isOpen,
  onOpenChange,
  getSubs,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  getSubs: () => void;
}) {
  const session = useSession();

  const onSubmit = async (e: any) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));

    let subject = await supabase()
      .from("Subject")
      .select()
      .eq("name", data.subject.toString());

    await supabase()
      .from("ta_User_Subject")
      .insert({
        userId: session.data?.user?.email,
        subjectId: subject.data ? subject.data[0].id : null,
      })
      .then((i) => {
        if (i.error) {
          toast.error("Erro ao salvar matéria", {
            description: i.error.message,
          });
        } else {
          toast.success("Matéria salva com sucesso!");
          onOpenChange(false);
          getSubs();
        }
      });
  };

  let list = useAsyncList<SWCharacter>({
    async load({ signal, filterText }) {
      let res = await supabase()
        .from("Subject")
        .select()
        .abortSignal(signal)
        .ilike("name", `%${filterText}%`);
      let json = res.data as SWCharacter[];

      return {
        items: json,
      };
    },
  });

  return (
    <>
      <Modal
        isOpen={isOpen}
        placement="top-center"
        onOpenChange={onOpenChange}
        onClose={() => {
          list.removeSelectedItems();
          list.setFilterText("");
        }}
      >
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
                  Adicionar matéria
                </ModalHeader>
                <ModalBody>
                  <Autocomplete
                    isRequired
                    name="subject"
                    inputValue={list.filterText}
                    isLoading={list.isLoading}
                    items={list.items}
                    label="Selecione sua matéria"
                    placeholder="Escreva para pesquisar..."
                    onInputChange={list.setFilterText}
                    listboxProps={{
                      emptyContent: (
                        <AddUnknowSubject
                          list={list}
                          subjectName={list.filterText}
                        />
                      ),
                    }}
                  >
                    {(item) => (
                      <AutocompleteItem
                        key={item.name}
                        value={item.id}
                        className="capitalize"
                      >
                        {item.name}
                      </AutocompleteItem>
                    )}
                  </Autocomplete>
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
  const [loading, setLoading] = useState(false);
  const addSubject = async () => {
    setLoading(true);
    await supabase()
      .from("Subject")
      .insert([{ name: subjectName, image: await getPhotoAI() }])
      .then(() => {
        list.reload();
        setLoading(false);
      });
  };

  const getPhoto = async () => {
    const res = await pexels.photos.search({ query: subjectName });
    if ("photos" in res && res.photos.length > 0) {
      return res.photos[0].src.original;
    } else {
      let aux = await pexels.photos.random();
      // @ts-ignore
      return aux.src.original;
    }
  };

  const getPhotoAI = async () => {
    const res = await fetch("/api/ai", {
      method: "POST",
      body: JSON.stringify({ prompt: subjectName }),
    });
    const data = await res.json();

    console.log(data);

    return data[0].url;
  };

  return (
    <div className="p-2 text-center">
      <p className="text-gray-500">Matéria não encontrada!</p>
      <Button
        isLoading={loading}
        onPress={addSubject}
        className="mt-2"
        size="sm"
        color="secondary"
      >
        Adicionar {subjectName}
      </Button>
    </div>
  );
}
