import { signIn } from "next-auth/react";

import { motion as m } from "framer-motion";
import { InteractiveHoverButton } from "../magicui/interactive-hover-button";
import { body, subtitle, title } from "../primitives";

export default function Hero() {
  return (
    <>
      <div className="flex flex-col items-center justify-start gap-4 py-20 w-full">
        <div className="text-center">
          <h1>
            {"Melhore seus estudos".split(" ").map((word, index) => (
              <m.span
                key={index}
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                  ease: "easeInOut",
                }}
                className={title({
                  size: "2xl",
                  className:
                    index === 2
                      ? "underline decoration-primary decoration-wavy mr-3 inline-block"
                      : "mr-3 inline-block",
                })}
              >
                {word}
              </m.span>
            ))}
          </h1>

          <h1
            className={title({
              size: "2xl",
            })}
          >
            {"e conquiste sua vaga!".split(" ").map((word, index) => (
              <m.span
                key={index}
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: 0.4 + index * 0.1,
                  ease: "easeInOut",
                }}
                className={title({
                  size: "2xl",
                  className:
                    index === 1
                      ? "underline decoration-primary mr-3 inline-block"
                      : "mr-3 inline-block",
                })}
              >
                {word}
              </m.span>
            ))}
          </h1>
        </div>
        <m.h2
          className={subtitle({
            className: "lg:!w-1/2 text-center",
          })}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            delay: 0.8,
            ease: "easeInOut",
          }}
        >
          O aplicativo que vai te ajudar a organizar seus estudos de forma
          simples e eficiente.
        </m.h2>
        <InteractiveHoverButton
          color="bg-primary"
          onClick={() => signIn("google", { redirectTo: "/dashboard" })}
          className="scale-125"
        >
          Começar
        </InteractiveHoverButton>
      </div>
      <m.p
        className={body({ className: "text-center !text-sm -mb-8 font-bold" })}
      >
        Quer saber mais? Vamos lá 👇
      </m.p>
    </>
  );
}
