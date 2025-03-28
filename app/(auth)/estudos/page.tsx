import React from "react";

import TableEstudos from "@/components/Estudos/tableEstudos";
import { subtitle, title } from "@/components/primitives";

export default function PageEstudos() {
  return (
    <div>
      <h1 className={title({ size: "lg" })}>Histórico de estudos</h1>
      <h3 className={subtitle({ className: "!w-3/4" })}>
        Abaixo temos uma tabela mostrando seus estudos anteriores, caso tenha
        cometido algum erro ao salvar, você pode editar e corrigí-los, ou até
        mesmo apagar...
      </h3>
      <TableEstudos />
    </div>
  );
}
