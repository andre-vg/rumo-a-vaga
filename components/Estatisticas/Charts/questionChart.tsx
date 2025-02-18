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
import { Skeleton } from "@heroui/skeleton";
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
          acc[date].percentage = Math.round(
            (acc[date].correctQuestions / acc[date].questions) * 100
          );
        } else {
          acc[date] = {
            date: date.split("-").reverse().join("/"),
            questions: current.questions ?? 0,
            correctQuestions: current.correctQuestions ?? 0,
            percentage: Math.round(
              ((current.correctQuestions ?? 0) / (current.questions ?? 1)) * 100
            ),
          };
        }
        return acc;
      },
      {} as Record<
        string,
        {
          date: string;
          questions: number;
          correctQuestions: number;
          percentage: number;
        }
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
            <ChartTooltip
              content={
                <ChartTooltipContent
                  hideLabel
                  className="w-[180px]"
                  formatter={(value, name, item, index) => (
                    <>
                      <div
                        className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
                        style={{
                          backgroundColor: item.color as string,
                        }}
                      />
                      {chartConfig[name as keyof typeof chartConfig]?.label ||
                        name}
                      <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                        {value}
                      </div>
                      {/* Add this after the last item */}
                      {index === 1 && (
                        <div className="mt-1.5 flex basis-full items-center border-t pt-1.5 text-xs font-medium text-foreground">
                          Taxa de acertos
                          <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                            {item.payload.percentage}%
                          </div>
                        </div>
                      )}
                    </>
                  )}
                />
              }
              cursor={false}
              defaultIndex={1}
            />{" "}
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="questions"
              fill="hsl(var(--heroui-primary))"
              radius={8}
            />
            <Bar
              dataKey="correctQuestions"
              fill="hsl(var(--heroui-success))"
              radius={8}
            />
          </BarChart>
        </ChartContainer>
      </div>
    </Skeleton>
  );
}
