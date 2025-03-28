import { signIn } from "next-auth/react";

import { InteractiveHoverButton } from "../magicui/interactive-hover-button";
import { body, subtitle, title } from "../primitives";

export default function Hero() {
  return (
    <>
      <div className="flex flex-col items-center justify-start gap-4 py-20 w-full">
        <div className="text-center">
          <h1
            className={title({
              size: "2xl",
            })}
          >
            Melhore seus{" "}
            <span className="underline decoration-primary decoration-wavy">
              estudos
            </span>
          </h1>

          <h1
            className={title({
              size: "2xl",
            })}
          >
            <span className="underline decoration-primary">Simplifique</span>{" "}
            sua rotina.
          </h1>
        </div>
        <h2
          className={subtitle({
            className: "!w-1/2 text-center",
          })}
        >
          O aplicativo que vai te ajudar a organizar seus estudos de forma
          simples e eficiente.
        </h2>
        <InteractiveHoverButton
          color="bg-primary"
          onClick={() => signIn("google", { redirectTo: "/dashboard" })}
        >
          Começar
        </InteractiveHoverButton>
      </div>
      <p
        className={body({ className: "text-center !text-sm -mb-8 font-bold" })}
      >
        Quer saber mais? Vamos lá 👇
      </p>
    </>
  );
}
