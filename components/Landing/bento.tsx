import { Button } from "@heroui/button";
import { signIn } from "next-auth/react";
import { Area, AreaChart, CartesianGrid } from "recharts";

import { AnimatedList } from "../magicui/animated-list";
import { body, title } from "../primitives";
import { ChartConfig, ChartContainer } from "../ui/chart";

import { cn } from "@/lib/utils";
import Image from "next/image";
import useMobileDetect from "@/hooks/mobileHook";

export default function Bento() {
  const isMobile = useMobileDetect().isMobile();
  return (
    <div className="py-12">
      <div className="grid xl:grid-cols-6 gap-4 w-full">
        <div className="h-96 w-full bg-background lg:col-span-3 p-8 rounded-3xl flex flex-col justify-between">
          <div>
            <h2 className={title({ size: "sm" })}>
              Cansado de planilhas? Pronto.
            </h2>
            <p className={body({ className: "!text-md" })}>
              Aqui você pode organizar seus estudos de forma simples e
              eficiente, sem precisar de planilhas.
            </p>
          </div>
          <div className="grid place-content-center grid-cols-3 h-full gap-4">
            {Array.from({ length: 3 }, (_, idx) => (
              <Image
                key={idx}
                width={200}
                height={200}
                alt="hero"
                className="h-full object-cover object-center rounded-none"
                src={`/sheets${idx + 1}.svg`}
              />
            ))}
          </div>
        </div>
        <div className="relative h-96 w-full bg-background lg:col-span-3 p-8 rounded-3xl">
          <div>
            <h2 className={title({ size: "sm" })}>
              Melhore sua produtividade!
            </h2>
            <p className={body({ className: "!text-md !w-3/4" })}>
              Estudos comprovam que a organização dos estudos aumenta a
              produtividade.
            </p>
          </div>
          <div className="absolute h-fit w-full left-0 -mt-14 lg:top-14">
            <ChartBento />
          </div>
        </div>
        <div className="h-96 w-full bg-background border-2 border-primary lg:col-span-2 p-8 rounded-3xl">
          <div>
            <h2 className={title({ size: "sm", color: "primary" })}>
              Acompanhe seu progresso!
            </h2>
            <p className={body({ className: "!text-md" })}>
              Com gráficos e estatísticas detalhadas, veja sua evolução e ajuste
              sua rotina conforme necessário.
            </p>
          </div>
        </div>
        <div className="h-96 w-full bg-primary lg:col-span-2 p-8 rounded-3xl justify-between flex flex-col">
          <div>
            <h2 className={title({ size: "sm", className: "text-default-50" })}>
              A hora é agora!
            </h2>
            <p className={body({ className: "!text-md text-default-50" })}>
              Comece a usar agora e veja a diferença na sua rotina de estudos.
            </p>
          </div>
          <Button
            fullWidth
            className="bg-background"
            color="default"
            endContent={<span>🚀</span>}
            variant="shadow"
            onPress={() => signIn("google", { redirectTo: "/dashboard" })}
          >
            Quero conhecer!
          </Button>
        </div>
        <div className="relative h-96 w-full bg-[url('/person-study.svg')] bg-[length:300px_200px] bg-no-repeat bg-background bg-bottom lg:col-span-2 p-8 rounded-3xl">
          <div>
            <h2 className={title({ size: "sm" })}>
              Revise com mais eficiência!
            </h2>
            <p className={body({ className: "!text-md" })}>
              Grave seus estudos e revise quando quiser. Uma maneira prática de
              consolidar o aprendizado.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ChartBento() {
  const chartData = [
    { month: "January", desktop: 40 },
    { month: "February", desktop: 60 },
    { month: "March", desktop: 60 },
    { month: "April", desktop: 90 },
    { month: "May", desktop: 100 },
    { month: "June", desktop: 150 },
  ];
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--heroui-primary))",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig}>
      <AreaChart
        accessibilityLayer
        data={chartData}
        margin={{
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
        }}
      >
        <CartesianGrid horizontal={false} vertical={false} />

        <defs>
          <linearGradient id="fillDesktop" x1="0" x2="0" y1="0" y2="1">
            <stop
              offset="0%"
              stopColor="var(--color-desktop)"
              stopOpacity={1}
            />
            <stop
              offset="100%"
              stopColor="var(--color-desktop)"
              stopOpacity={0}
            />
          </linearGradient>
        </defs>

        <Area
          dataKey="desktop"
          fill="url(#fillDesktop)"
          fillOpacity={1}
          overlineThickness={2}
          stackId="a"
          stroke="var(--color-desktop)"
          strokeWidth={3}
          type="natural"
        />
      </AreaChart>
    </ChartContainer>
  );
}
