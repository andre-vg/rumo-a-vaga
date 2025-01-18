"use client";

import { QuestionChart } from "@/components/Estatisticas/Charts/questionChart";
import { Database } from "@/database.types";
import { supabase } from "@/utils/supabase/client";
import React from "react";
import moment from "moment";
import { title } from "@/components/primitives";
import { DateRangePicker } from "@nextui-org/date-picker";
import {
  parseDate,
  getLocalTimeZone,
  DateValue,
  today,
  startOfMonth,
} from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";
import { RangeValue } from "@react-types/shared";
import { useSession } from "next-auth/react";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Skeleton } from "@nextui-org/skeleton";
import { SubjectChart } from "@/components/Estatisticas/Charts/subjectChart";

export default function PageStats() {
  const [stats, setStats] =
    React.useState<Database["public"]["Tables"]["Study"]["Row"][]>();
  const [value, setValue] = React.useState<RangeValue<DateValue> | null>({
    start: parseDate(startOfMonth(today(getLocalTimeZone())).toString()),
    end: parseDate(today(getLocalTimeZone()).toString()),
  });

  const { data } = useSession();

  let formatter = useDateFormatter({ dateStyle: "short" });
  const statsQuery = supabase()
    .from("Study")
    .select("*, Subject(id, name)")
    .eq("userId", "leticiacsfurtado@gmail.com")
    .gte(
      "date",
      formatter
        .format(value!.start?.toDate(getLocalTimeZone()))
        .split("/")
        .reverse()
        .join("-")
    )
    .lte(
      "date",
      formatter
        .format(value!.end?.toDate(getLocalTimeZone()))
        .split("/")
        .reverse()
        .join("-")
    );

  const getStats = async () => {
    const { data, error } = await statsQuery;
    if (error) {
      console.error(error);
      return;
    }
    setStats(data);
  };

  React.useEffect(() => {
    getStats();
  }, [value]);

  React.useEffect(() => {
    getStats();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className={title({ size: "lg" })}>Estatísticas</h1>
        <h3 className="text-xl font-sub">
          Acompanhe o seu progresso e veja como você está se saindo nos seus
        </h3>

        <div className="grid grid-cols-2 w-full">
          <DateRangePicker
            label="Birth date"
            pageBehavior="single"
            value={value}
            onChange={setValue}
            visibleMonths={2}
          />
        </div>

        <StatCards stats={stats} value={value} />
      </div>
      <div className="grid grid-cols-2 gap-8">
        <QuestionChart chartData={stats} />
        {/* <SubjectChart chartData={stats} /> */}
      </div>
    </div>
  );
}

function StatCards({
  stats,
  value,
}: {
  stats?: Database["public"]["Tables"]["Study"]["Row"][];
  value: RangeValue<DateValue> | null;
}) {
  const getTotalTime = () => {
    let total = 0;
    stats?.forEach((stat) => {
      total += moment(stat.time, "HH:mm:ss").diff(
        moment().startOf("day"),
        "seconds"
      );
    });
    return total;
  };

  const getAverageTime = () => {
    return (
      getTotalTime() /
      (moment(value!.end!.toDate(getLocalTimeZone())).diff(
        moment(value!.start!.toDate(getLocalTimeZone())),
        "days"
      ) +
        1)
    );
  };

  const getTotalQuestions = () => {
    let total = 0;
    stats?.forEach((stat) => {
      total += stat.questions ?? 0;
    });
    return total;
  };

  return (
    <div className="grid-cols-3 grid gap-8 mt-8">
      <Skeleton isLoaded={!!stats}>
        <Card>
          <CardHeader>
            <h2 className={title({ size: "sm" })}>
              {stats && moment.utc(getTotalTime() * 1000).format("HH:mm:ss")}
            </h2>
          </CardHeader>
          <CardBody>
            <p className="text-sm">
              Esse foi o tempo total que você passou estudando entre as datas
              selecionadas.
            </p>
            <p className="text-sm">
              Isso equivale a uma média de{" "}
              {moment.utc(getAverageTime() * 1000).format("HH:mm")} por dia!!
            </p>
          </CardBody>
        </Card>
      </Skeleton>
      <Skeleton isLoaded={!!stats}>
        <Card>
          <CardHeader>
            <h2 className={title({ size: "sm" })}>
              {stats && getTotalQuestions()}
            </h2>
          </CardHeader>
          <CardBody>
            <p className="text-sm">
              Esse foi o total de questões que você respondeu entre as datas
              selecionadas.
            </p>
            <p className="text-sm">
              Isso equivale a uma média de{" "}
              {Math.round(
                getTotalQuestions() /
                  (moment(value!.end!.toDate(getLocalTimeZone())).diff(
                    moment(value!.start!.toDate(getLocalTimeZone())),
                    "days"
                  ) +
                    1)
              )}{" "}
              por dia!!
            </p>
          </CardBody>
        </Card>
      </Skeleton>
    </div>
  );
}
