import { Button } from "@heroui/button";
import { Image } from "@heroui/image";
import { signIn } from "next-auth/react";
import { Area, AreaChart, CartesianGrid } from "recharts";

import { AnimatedList } from "../magicui/animated-list";
import { body, title } from "../primitives";
import { ChartConfig, ChartContainer } from "../ui/chart";

import { cn } from "@/lib/utils";

export default function Bento() {
  // {
  //   {
  //     "title": "Revise com mais eficiência!",
  //     "description": "Grave seus estudos e revise quando quiser. Uma maneira prática de consolidar o aprendizado."
  //   }}
  return (
    <div className="py-12">
      <div className="grid grid-cols-6 gap-4 w-full">
        <div className="h-96 w-full bg-background col-span-3 p-8 rounded-3xl flex flex-col justify-between">
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
                removeWrapper
                alt="hero"
                classNames={{
                  img: cn("h-full object-cover object-center rounded-none"),
                }}
                src={`/sheets${idx + 1}.svg`}
              />
            ))}
          </div>
        </div>
        <div className="relative h-96 w-full bg-background col-span-3 p-8 rounded-3xl">
          <div>
            <h2 className={title({ size: "sm" })}>
              Melhore sua produtividade!
            </h2>
            <p className={body({ className: "!text-md !w-3/4" })}>
              Estudos comprovam que a organização dos estudos aumenta a
              produtividade.
            </p>
          </div>
          <div className="absolute h-full w-full left-0 top-14">
            <ChartBento />
          </div>
        </div>
        <div className="h-96 w-full bg-background border-2 border-primary col-span-2 p-8 rounded-3xl">
          <div>
            <h2 className={title({ size: "sm", color: "primary" })}>
              Acompanhe seu progresso!
            </h2>
            <p className={body({ className: "!text-md" })}>
              Com gráficos e estatísticas detalhadas, veja sua evolução e ajuste
              sua rotina conforme necessário.
            </p>
            <BentoTable />
          </div>
        </div>
        <div className="h-96 w-full bg-primary col-span-2 p-8 rounded-3xl justify-between flex flex-col">
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
        <div className="relative h-96 w-full bg-[url('/person-study.svg')] bg-[length:300px_200px] bg-no-repeat bg-background bg-bottom col-span-2 p-8 rounded-3xl">
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

export function BentoTable() {
  let notifications = [
    {
      name: "Estudo realizado",
      description: "Direito Constitucional",
      time: "45 min",

      icon: "⚖️",
      color: "#00C9A7",
    },
    {
      name: "Questões respondidas",
      description: "Matemática Financeira",
      time: "1h 20min",
      icon: "🧮",
      color: "#FFB800",
    },
    {
      name: "Revisão concluída",
      description: "Computação",
      time: "2h 30min",
      icon: "💻",
      color: "#FF3D71",
    },
    {
      name: "Novidades",
      description: "Confira as últimas notícias",
      time: "5 min",
      icon: "📰",
      color: "#1E86FF",
    },
  ];

  notifications = Array.from({ length: 10 }, () => notifications).flat();

  return (
    <div
      className={cn(
        "relative flex h- w-full h-32 flex-col overflow-hidden p-2",
      )}
    >
      <AnimatedList>
        {notifications.map((item, idx) => (
          <Notification {...item} key={idx} />
        ))}
      </AnimatedList>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 " />
    </div>
  );
}
interface Item {
  name: string;
  description: string;
  icon: string;
  color: string;
  time: string;
}

const Notification = ({ name, description, icon, color, time }: Item) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
        // animation styles
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        // light styles
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        // dark styles
        "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex size-10 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: color,
          }}
        >
          <span className="text-lg">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white ">
            <span className="text-sm sm:text-lg">{name}</span>
            <span className="mx-1">·</span>
            <span className="text-xs text-gray-500">{time}</span>
          </figcaption>
          <p className="text-sm font-normal dark:text-white/60">
            {description}
          </p>
        </div>
      </div>
    </figure>
  );
};
