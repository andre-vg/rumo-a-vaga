import Link from "next/link";
import {
  Clock,
  BookOpen,
  Target,
  TrendingUp,
  Calendar,
  Award,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/server";

import { StatCard } from "@/components/features/dashboard/stat-card";
import { PeriodStats } from "@/components/features/dashboard/period-stats";
import { StudiesBySubject } from "@/components/features/dashboard/studies-by-subject";
import { RecentStudies } from "@/components/features/dashboard/recent-studies";
import { DashboardLoading } from "@/components/features/dashboard/dashboard-loading";

function formatMinutes(minutes: number | null): string {
  if (minutes === null || minutes === undefined) return "0min";
  if (minutes < 60) return `${minutes}min`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (remainingMinutes === 0) return `${hours}h`;
  return `${hours}h ${remainingMinutes}min`;
}

async function DashboardContent() {
  const stats = await api.study.getStats();
  const recentStudies = await api.study.getAll({ limit: 5, offset: 0 });

  const periodStats = [
    {
      icon: Calendar,
      iconColorClass: "text-violet-600",
      label: "Hoje",
      studies: stats.todayStudies,
      minutes: formatMinutes(stats.todayMinutes),
      gradientClass:
        "bg-gradient-to-br from-violet-50 to-white border-violet-100",
    },
    {
      icon: BarChart3,
      iconColorClass: "text-emerald-600",
      label: "Últimos 7 dias",
      studies: stats.weeklyStudies,
      minutes: formatMinutes(stats.weeklyMinutes),
      gradientClass:
        "bg-gradient-to-br from-emerald-50 to-white border-emerald-100",
    },
    {
      icon: Award,
      iconColorClass: "text-amber-600",
      label: "Últimos 30 dias",
      studies: stats.monthlyStudies,
      minutes: formatMinutes(stats.monthlyMinutes),
      gradientClass:
        "bg-gradient-to-br from-amber-50 to-white border-amber-100",
    },
  ];

  const studiesBySubject = stats.studiesBySubject.map((item) => ({
    subjectId: item.subjectId,
    subjectName: item.subjectName,
    count: Number(item.count),
    totalMinutes: formatMinutes(Number(item.totalMinutes)),
  }));

  return (
    <>
      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total de Estudos"
          value={stats.totalStudies.toString()}
          icon={BookOpen}
          iconBgClass="bg-violet-100"
          iconColorClass="text-violet-600"
        />
        <StatCard
          title="Tempo Total"
          value={formatMinutes(stats.totalMinutes)}
          icon={Clock}
          iconBgClass="bg-emerald-100"
          iconColorClass="text-emerald-600"
        />
        <StatCard
          title="Questões Respondidas"
          value={stats.totalQuestions.toString()}
          icon={Target}
          iconBgClass="bg-blue-100"
          iconColorClass="text-blue-600"
        />
        <StatCard
          title="Taxa de Acerto"
          value={`${stats.accuracy}%`}
          icon={TrendingUp}
          iconBgClass="bg-amber-100"
          iconColorClass="text-amber-600"
        />
      </div>

      {/* Period Stats */}
      <PeriodStats stats={periodStats} />

      {/* Studies by Subject */}
      <StudiesBySubject subjects={studiesBySubject} />

      {/* Recent Studies */}
      {/* <RecentStudies studies={recentStudies} formatMinutes={formatMinutes} /> */}
    </>
  );
}

export default async function DashboardPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-gray-600">
            Acompanhe seu progresso e evolução nos estudos
          </p>
        </div>
        <Link href="/estudo">
          <Button className="bg-gradient-to-r from-violet-600 to-purple-500 hover:from-violet-700 hover:to-purple-600">
            <Clock className="mr-2 h-4 w-4" />
            Iniciar Estudo
          </Button>
        </Link>
      </div>

      {/* Content - Server Component with Suspense */}
      <DashboardContent />
    </div>
  );
}
