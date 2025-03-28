import { signIn } from "next-auth/react";
import { InteractiveHoverButton } from "../magicui/interactive-hover-button";
import { subtitle, title } from "../primitives";

export default function Hero() {
  return (
    <div className="flex flex-col items-center justify-start gap-4 py-20 border-b-2 w-full">
      <div className="text-center">
        <h1
          className={title({
            size: "xl",
          })}
        >
          Melhore seus estudos
        </h1>
        <h1
          className={title({
            size: "xl",
          })}
        >
          Simplifique sua rotina.
        </h1>
      </div>
      <h2
        className={subtitle({
          className: "!w-1/2 text-center",
        })}
      >
        O aplicativo que vai te ajudar a organizar seus estudos de forma simples
        e eficiente.
      </h2>
      <InteractiveHoverButton
        onClick={() => signIn("google", { redirectTo: "/dashboard" })}
        color="bg-primary"
      >
        Começar
      </InteractiveHoverButton>
    </div>
  );
}
