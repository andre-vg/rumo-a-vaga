import { Card, CardContent } from "@/components/ui/card";

interface PeriodStat {
  icon: React.ComponentType<{ className?: string }>;
  iconColorClass: string;
  label: string;
  studies: number;
  minutes: string;
  gradientClass: string;
}

interface PeriodStatsProps {
  stats: PeriodStat[];
}

export function PeriodStats({ stats }: PeriodStatsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {stats.map((stat, index) => (
        <Card key={index} className={stat.gradientClass}>
          <CardContent className="pt-6">
            <div className="mb-2 flex items-center gap-3">
              <stat.icon className={`h-5 w-5 ${stat.iconColorClass}`} />
              <span className="font-medium text-gray-700">{stat.label}</span>
            </div>
            <div className="mb-1 text-2xl font-bold text-gray-900">
              {stat.studies} estudos
            </div>
            <div className="text-sm text-gray-600">
              {stat.minutes} de estudo
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
