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

// const chartConfig = {
//   subjectName: {
//     label: "Materia",
//     color: "hsl(var(--heroui-primary))",
//   },
//   timeSpent: {
//     label: "Tempo",
//     color: "hsl(var(--heroui-primary))",
//   },
// } satisfies ChartConfig;

export function SubjectChart({ chartData }: { chartData: any }) {
  const transformChartData = (
    chartData: Database["public"]["Tables"]["Study"]["Row"][]
  ) => {
    // return an object with the Subject name and the time spent on it
    return chartData.reduce(
      (acc, current) => {
        //@ts-ignore
        const subjectName = current.Subject.name;

        if (!subjectName) return acc;
        if (acc[subjectName]) {
          acc[subjectName].timeSpent += Number(current.time);
        } else {
          acc[subjectName] = {
            subjectName: subjectName,
            timeSpent: current.time || "",
            //@ts-ignore
            fill: `hsl(var(--heroui-neutral-${
              Math.floor(Math.random() * 9) * 100 + 100
            }))`,
          };
        }

        return acc;
      },
      {} as Record<string, { subjectName: string; timeSpent: string }>
    );
  };

  const makeChartConfig = (
    chartData: Database["public"]["Tables"]["Study"]["Row"][]
  ) => {
    // return an object with the Subject name and the time spent on it the objectKey is the Subject name
    let obj: Record<
      string,
      { subjectName: string; timeSpent: number; color: string }
    > = {};
    chartData.forEach((item) => {
      //@ts-ignore
      const subjectName = item.Subject.name;
      const timeSpent = item.time;

      if (obj[subjectName]) {
        obj[subjectName].timeSpent += Number(timeSpent);
      } else {
        obj[subjectName] = {
          subjectName,
          timeSpent: Number(timeSpent),
          color: "hsl(var(--heroui-primary))",
        };
      }
    });
    return obj;
  };

  const chartCofig = makeChartConfig(chartData || []);
  const chartDatas = Object.values(transformChartData(chartData || []));

  console.log(chartDatas);

  return (
    <Skeleton isLoaded={!!chartDatas}>
      <ChartContainer
        config={chartCofig as ChartConfig}
        className="min-h-[150px]"
      >
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
