"use client";
import { Button } from "@heroui/button";
import { useDisclosure } from "@heroui/modal";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

import { supabase } from "@/utils/supabase/client";
import { subtitle, title } from "@/components/primitives";
import AddSubjectModal from "@/components/modals/addSubjectModal";
import SubjectCards from "@/components/Dashboard/subjectCards";

export default function PageDash() {
  const { onOpen, onOpenChange, isOpen } = useDisclosure();
  const { data } = useSession();

  const [subs, setSubs] = React.useState<any[]>([]);

  async function getSubs() {
    await supabase()
      .from("ta_User_Subject")
      .select()
      .eq("userId", data?.user?.email!)
      .then((res) => {
        supabase()
          .from("Subject")
          .select()
          .in(
            "id",
            res.data!.map((sub) => Number(sub.subjectId)),
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
      <h1 className={title({ size: "lg" })}>
        Olá, {data?.user?.name?.split(" ")[0]}
      </h1>

      <h1 className={title({ size: "md" })}>Vamos começar?</h1>
      <h3 className={subtitle()}>A aprovação não virá sozinha!</h3>
      <Button
        color="primary"
        startContent={<Plus size={20} />}
        onPress={onOpen}
      >
        Adicionar matéria
      </Button>
      <div className="grid lg:grid-cols-2 gap-4 mt-4">
        {subs && <SubjectCards subjects={subs} />}
      </div>
      <AddSubjectModal
        getSubs={getSubs}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </div>
  );
}
