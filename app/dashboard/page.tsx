"use client";
import { signOut, useSession } from "next-auth/react";
import AddSubjectModal from "@/components/modals/addSubjectModal";
import { subtitle, title } from "@/components/primitives";
import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/modal";
import { Plus } from "lucide-react";
import React, { useEffect } from "react";
import { supabase } from "@/utils/supabase/client";

export default function PageDash() {
  const { onOpen, onOpenChange, isOpen } = useDisclosure();
  const { data } = useSession();

  async function addUser() {
    console.log(data);
    
  }

  useEffect(() => {
    addUser();
  }, [data]);

  return (
    <>
      <Button onPress={() => signOut()}>Sign Out</Button>
      <h1 className={title({ size: "lg" })}>Vamos começar...</h1>
      <h3 className={subtitle()}>A aprovação não vem sozinha!</h3>
      <h2>{data?.user?.image}</h2>
      <Button onPress={onOpen} startContent={<Plus size={20} />}>
        Adicionar matéria
      </Button>
      <AddSubjectModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
}
