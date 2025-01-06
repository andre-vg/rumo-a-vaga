"use client";
import { signOut, useSession } from "next-auth/react";
import AddSubjectModal from "@/components/modals/addSubjectModal";
import { subtitle, title } from "@/components/primitives";
import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/modal";
import { Plus } from "lucide-react";
import React, { Suspense, useEffect } from "react";
import { supabase } from "@/utils/supabase/client";
import SubjectCards from "@/components/Dashboard/subjectCards";

export default function PageDash() {
  const { onOpen, onOpenChange, isOpen } = useDisclosure();
  const { data } = useSession();

  const [subs, setSubs] = React.useState<any[]>([]);

  async function getSubs() {
    supabase()
      .from("ta_User_Subject")
      .select()
      .eq("userId", data?.user?.email!)
      .then((res) => {
        supabase()
          .from("Subject")
          .select()
          .in(
            "id",
            res.data!.map((sub) => sub.subjectId)
          )
          .then((res) => {
            setSubs(res.data!);
          });
      });
  }

  useEffect(() => {
    if (data) {
      getSubs();
    }
  }, [data]);

  return (
    <div>
      <Button onPress={() => signOut()}>Sign Out</Button>
      <h1 className={title({ size: "lg" })}>Vamos começar...</h1>
      <h3 className={subtitle()}>A aprovação não vem sozinha!</h3>
      <h2>{data?.user?.id?.toString()}</h2>
      <Button onPress={onOpen} startContent={<Plus size={20} />}>
        Adicionar matéria
      </Button>
      <div className="grid grid-cols-2 gap-4 mt-4">

      {subs && <SubjectCards subjects={subs} />}
      </div>
      <AddSubjectModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
}
