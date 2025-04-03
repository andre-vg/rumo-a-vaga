import { InfiniteSlider } from "../motion-primitives/infinite-slider";
import { ProgressiveBlur } from "../motion-primitives/progressive-blur";
import { body } from "../primitives";

export default function Companies() {
  const VAGAS = [
    "Bancos",
    "Tribunais",
    "Polícia",
    "Prefeituras",
    "Ministérios",
    "Agências",
    "Universidades",
  ];

  return (
    <div className="relative h-[350px] w-full overflow-hidden">
      <InfiniteSlider
        className="flex h-full w-full items-center"
        speed={100}
        speedOnHover={50}
      >
        {VAGAS.map((vaga, i) => (
          <div
            key={i}
            className="flex items-center justify-center w-[200px] h-[200px]"
          >
            <span className={body({ className: "font-medium text-2xl" })}>
              {vaga}
            </span>
          </div>
        ))}
      </InfiniteSlider>
      <ProgressiveBlur
        blurIntensity={1}
        className="pointer-events-none absolute top-0 left-0 h-full lg:w-[200px]"
        direction="left"
      />
      <ProgressiveBlur
        blurIntensity={1}
        className="pointer-events-none absolute top-0 right-0 h-full lg:w-[200px]"
        direction="right"
      />
    </div>
  );
}
