import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import React from "react";

export default function MethodAutoComplete({
  defaultSelectedKey,
}: {
  defaultSelectedKey?: string | null;
}) {
  return (
    <Autocomplete
      defaultSelectedKey={
        defaultSelectedKey as
          | "Videoaula"
          | "Livro"
          | "Lei Seca"
          | "Resumo"
          | "Revisão"
          | "Exercícios"
          | "Simulado"
          | "Aula presencial"
          | "PDF"
      }
      label="Método de estudo"
      name="method"
      isRequired
    >
      <AutocompleteItem key="Videoaula" value="Videoaula">
        Videoaula
      </AutocompleteItem>
      <AutocompleteItem key="Livro" value="Livro">
        Livro
      </AutocompleteItem>
      <AutocompleteItem key="Lei Seca" value="Lei Seca">
        Lei Seca
      </AutocompleteItem>
      <AutocompleteItem key="Resumo" value="Resumo">
        Resumo
      </AutocompleteItem>
      <AutocompleteItem key="Revisão" value="Revisão">
        Revisão
      </AutocompleteItem>
      <AutocompleteItem key="Exercícios" value="Exercícios">
        Exercícios
      </AutocompleteItem>
      <AutocompleteItem key="Simulado" value="Simulado">
        Simulado
      </AutocompleteItem>
      <AutocompleteItem key="Aula presencial" value="Aula presencial">
        Aula presencial
      </AutocompleteItem>
      <AutocompleteItem key="PDF" value="PDF">
        PDF
      </AutocompleteItem>
    </Autocomplete>
  );
}
