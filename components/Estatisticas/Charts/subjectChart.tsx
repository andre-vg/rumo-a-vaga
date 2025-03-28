"use client";
import { Pie, PieChart } from "recharts";
import { Skeleton } from "@heroui/skeleton";
import moment from "moment";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Database } from "@/database.types";

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
            content={<ChartTooltipContent hideLabel />}
            cursor={false}
          />
          <Pie data={chartDatas} dataKey="timeSpent" nameKey="subjectName" />
        </PieChart>
      </ChartContainer>
    </Skeleton>
  );
}
