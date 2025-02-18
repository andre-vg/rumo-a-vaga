import { TimelineSection } from "@/components/Novidades/timelineSection";
import { body, title } from "@/components/primitives";
import React from "react";

export default function PageNews() {
  return (
    <div>
      <h1 className={title()}>Timeline do Projeto</h1>
      <p className={body()}>
        Acompanhe as novidades e atualizações do projeto.
      </p>
      <TimelineSection />
    </div>
  );
}
