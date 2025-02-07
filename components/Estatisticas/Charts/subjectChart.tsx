"use client";
import { Bar, BarChart, Pie, PieChart, XAxis } from "recharts";
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
import moment from "moment";

const chartConfig = {
  subjectName: {
    label: "Materia",
    color: "hsl(var(--heroui-primary))",
  },
  timeSpent: {
    label: "Tempo",
  },
} satisfies ChartConfig;

export function SubjectChart({ chartData }: { chartData: any }) {
  const transformChartData = (
    chartData: Database["public"]["Tables"]["Study"]["Row"][],
  ) => {
    // return an object with the Subject name and the time spent on it
    return chartData.reduce(
      (acc, current) => {
        //@ts-ignore
        const subjectName = current.Subject.name;
        if (!subjectName) return acc;
        if (acc[subjectName]) {
          acc[subjectName].timeSpent += moment(current.time).format("seconds");
        } else {
          acc[subjectName] = {
            subjectName: subjectName,
            timeSpent: current.time || "",
          };
        }
        return acc;
      },
      {} as Record<string, { subjectName: string; timeSpent: string }>,
    );
  };

  const chartDatas = Object.values(transformChartData(chartData || []));
  console.log(chartDatas);

  return (
    <Skeleton isLoaded={!!chartDatas}>
      <ChartContainer config={chartConfig}>
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie data={chartDatas} dataKey="timeSpent" nameKey="subjectName" />
        </PieChart>
      </ChartContainer>
    </Skeleton>
  );
}
