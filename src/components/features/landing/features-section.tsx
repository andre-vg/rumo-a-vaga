import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

interface FeaturesSectionProps {
  title: string;
  highlightedText: string;
  description: string;
  features: Feature[];
}

export function FeaturesSection({
  title,
  highlightedText,
  description,
  features,
}: FeaturesSectionProps) {
  return (
    <section id="features" className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            {title} <span className="text-violet-600">{highlightedText}</span>
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            {description}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-8 transition-all hover:border-violet-200 hover:shadow-lg hover:shadow-violet-100"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-violet-100 to-purple-100 transition-transform group-hover:scale-110">
                <feature.icon className="h-7 w-7 text-violet-600" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="leading-relaxed text-gray-600">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
