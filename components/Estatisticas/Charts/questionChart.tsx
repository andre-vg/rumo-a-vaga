"use client";
import { Bar, BarChart, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Database } from "@/database.types";
import { Skeleton } from "@nextui-org/skeleton";
import { title } from "../../primitives";

const chartConfig = {
  questions: {
    label: "Questões",
  },
  correctQuestions: {
    label: "Acertos",
  },
} satisfies ChartConfig;

export function QuestionChart({
  chartData,
}: {
  chartData: Database["public"]["Tables"]["Study"]["Row"][] | undefined;
}) {
  const transformChartData = (
    chartData: Database["public"]["Tables"]["Study"]["Row"][]
  ) => {
    return chartData.reduce(
      (acc, current) => {
        const date = current.date;
        if (!date) return acc;
        if (acc[date]) {
          acc[date].questions += current.questions ?? 0;
          acc[date].correctQuestions += current.correctQuestions ?? 0;
        } else {
          acc[date] = {
            date: date.split("-").reverse().join("/"),
            questions: current.questions ?? 0,
            correctQuestions: current.correctQuestions ?? 0,
          };
        }
        return acc;
      },
      {} as Record<
        string,
        { date: string; questions: number; correctQuestions: number }
      >
    );
  };

  const chartDatas = Object.values(transformChartData(chartData || []));

  return (
    <Skeleton isLoaded={!!chartDatas}>
      <div className="border-2 rounded-xl p-4">
        <h1 className={title({ size: "xs", className: "tracking-normal" })}>
          Questões Respondidas x Acertos
        </h1>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartDatas}>
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="correctQuestions"
              fill="hsl(var(--heroui-success))"
              radius={8}
            />
            <Bar
              dataKey="questions"
              fill="hsl(var(--heroui-primary))"
              radius={8}
            />
          </BarChart>
        </ChartContainer>
      </div>
    </Skeleton>
  );
}
