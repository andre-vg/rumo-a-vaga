import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import React from "react";

export default function MethodAutoComplete() {
  return (
    <Autocomplete label="Método de estudo" name="method" isRequired>
      <AutocompleteItem value="Videoaula">Videoaula</AutocompleteItem>
      <AutocompleteItem value="Livro">Livro</AutocompleteItem>
      <AutocompleteItem value="Lei Seca">Lei Seca</AutocompleteItem>
      <AutocompleteItem value="Resumo">Resumo</AutocompleteItem>
      <AutocompleteItem value="Revisão">Revisão</AutocompleteItem>
      <AutocompleteItem value="Exercícios">Exercícios</AutocompleteItem>
      <AutocompleteItem value="Simulado">Simulado</AutocompleteItem>
      <AutocompleteItem value="Aula presencial">
        Aula presencial
      </AutocompleteItem>
      <AutocompleteItem value="PDF">PDF</AutocompleteItem>
    </Autocomplete>
  );
}
