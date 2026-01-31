import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface Step {
  step: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface HowItWorksSectionProps {
  title: string;
  description: string;
  steps: Step[];
}

export function HowItWorksSection({
  title,
  description,
  steps,
}: HowItWorksSectionProps) {
  return (
    <section
      id="como-funciona"
      className="bg-gradient-to-b from-violet-50 to-purple-50 px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            {title}
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            {description}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((item, index) => (
            <div key={index} className="relative">
              <div className="h-full rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
                <div className="mb-4 text-5xl font-bold text-violet-100">
                  {item.step}
                </div>
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-purple-500">
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="absolute top-1/2 -right-4 z-10 hidden -translate-y-1/2 transform md:block">
                  <ArrowRight className="h-8 w-8 text-violet-300" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
