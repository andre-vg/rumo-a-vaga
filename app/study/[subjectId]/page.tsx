import { title } from "@/components/primitives";
import Clock from "@/components/Study/clock";
import { supabase } from "@/utils/supabase/client";

export default async function Page({
  params,
}: {
  params: Promise<{ subjectId: string }>;
}) {
  const subjectId = (await params).subjectId;

  const subject = await supabase()
    .from("Subject")
    .select()
    .eq("id", subjectId)
    .single();

  return (
    <div className="mt-16">
      <h1 className={title()}>Vamos estudar {subject.data?.name}!</h1>
      <div className="grid">
        <Clock />
      </div>
    </div>
  );
}
