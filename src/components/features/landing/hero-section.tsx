import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";

interface Stat {
  value: string;
  label: string;
}

interface HeroSectionProps {
  title: string;
  highlightedText: string;
  description: string;
  stats: Stat[];
}

export function HeroSection({
  title,
  highlightedText,
  description,
  stats,
}: HeroSectionProps) {
  return (
    <section className="px-4 pt-32 pb-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-2 text-sm font-medium text-violet-700">
            <Sparkles className="h-4 w-4" />
            <span>Organize seus estudos de forma inteligente</span>
          </div>

          <h1 className="mb-6 text-5xl leading-tight font-bold text-gray-900 sm:text-6xl lg:text-7xl">
            {title}{" "}
            <span className="bg-gradient-to-r from-violet-600 via-purple-500 to-purple-500 bg-clip-text text-transparent">
              {highlightedText}
            </span>
          </h1>

          <p className="mx-auto mb-10 max-w-3xl text-xl leading-relaxed text-gray-600">
            {description}
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/login">
              <Button
                size="lg"
                className="rounded-xl bg-gradient-to-r from-violet-600 to-purple-500 px-8 py-6 text-lg text-white shadow-lg shadow-violet-200 transition-all hover:from-violet-700 hover:to-purple-600 hover:shadow-xl hover:shadow-violet-300"
              >
                Começar Agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="#como-funciona">
              <Button
                size="lg"
                variant="outline"
                className="rounded-xl border-2 border-gray-200 px-8 py-6 text-lg hover:border-violet-300 hover:bg-violet-50"
              >
                Ver Como Funciona
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="bg-gradient-to-r from-violet-600 to-purple-500 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
                {stat.value}
              </div>
              <div className="mt-1 text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
