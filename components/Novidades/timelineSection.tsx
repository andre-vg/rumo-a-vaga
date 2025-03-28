import { subtitle } from "../primitives";

import { Timeline } from "@/components/ui/timeline";

export function TimelineSection() {
  const data = [
    {
      title: "28/03/2025",
      content: (
        <div>
          <ul className={subtitle({ className: "list-disc space-y-4" })}>
            <li>
              Agora temos Landing Page, com informações sobre o projeto e
              funcionalidades. Feito para atrair novos usuários.
            </li>
            <li>
              Agora temos a cor primaria do projeto, que é o roxo, deixando
              aquele azul de lado!!
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "17/02/2025",
      content: (
        <div>
          <ul className={subtitle({ className: "list-disc space-y-4" })}>
            <li>
              1° Versão da aba de novidades, para que os usuários possam saber o
              que há de novo no sistema.
            </li>
            <li>
              Agora no gráfico de questões, é possível ver a porcentagem de
              acertos.
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "03/02/2025",
      content: (
        <div>
          <ul className={subtitle({ className: "list-disc space-y-4" })}>
            <li>
              1° Versão da aba de estudos, com opção de editar os estudos
              antigos, caso o usuário deseje.
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "16/01/2025",
      content: (
        <div>
          <ul className={subtitle({ className: "list-disc space-y-4" })}>
            <li>
              1° Versão da aba de estatísticas, com gráficos de questões
              respondidas, acertos e erros.
            </li>
          </ul>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      <Timeline data={data} />
    </div>
  );
}
