import { title } from "@/components/primitives";
import Clock from "@/components/Study/clock";
import { supabase } from "@/utils/supabase/client";
import { Link } from "@nextui-org/link";
import { CircleChevronLeft } from "lucide-react";

export default async function Page({
  params,
}: {
  params: Promise<{ subjectId: string }>;
}) {
  const subjectId = (await params).subjectId;

  const subject = await supabase()
    .from("Subject")
    .select()
    .eq("id", Number(subjectId))
    .single();

  return (
    <div className="mt-16">
      <div className="flex flex-row items-center gap-2">
        <Link href="/dashboard">
          <CircleChevronLeft className="cursor-pointer size-8" />
        </Link>
        <h1 className={title()}>Vamos estudar {subject.data?.name}!</h1>
      </div>
      <div className="grid">
        <Clock />
      </div>
    </div>
  );
}
