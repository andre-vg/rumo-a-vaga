import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

interface PlanFeature {
  text: string;
}

interface Plan {
  name: string;
  description: string;
  price: string;
  period: string;
  features: PlanFeature[];
  recommended?: boolean;
  buttonText: string;
  buttonVariant: "outline" | "default";
}

interface PricingSectionProps {
  title: string;
  description: string;
  plans: Plan[];
}

export function PricingSection({
  title,
  description,
  plans,
}: PricingSectionProps) {
  return (
    <section id="precos" className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            {title}
          </h2>
          <p className="text-xl text-gray-600">{description}</p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative overflow-hidden rounded-2xl p-8 ${
                plan.recommended
                  ? "border-2 border-violet-600 bg-gradient-to-br from-violet-50 to-white"
                  : "border-2 border-gray-200 bg-gray-50/50"
              }`}
            >
              {plan.recommended && (
                <div className="absolute top-4 right-4 rounded-full bg-violet-600 px-3 py-1 text-sm font-medium text-white">
                  Recomendado
                </div>
              )}
              <h3 className="mb-2 text-2xl font-bold text-gray-900">
                {plan.name}
              </h3>
              <p className="mb-6 text-gray-600">{plan.description}</p>
              <div
                className={`mb-8 text-4xl font-bold ${
                  plan.recommended
                    ? "bg-gradient-to-r from-violet-600 to-purple-500 bg-clip-text text-transparent"
                    : "text-gray-900"
                }`}
              >
                {plan.price}
                <span className="text-lg font-normal text-gray-500">
                  {plan.period}
                </span>
              </div>
              <ul className="mb-8 space-y-4">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <CheckCircle
                      className={`h-5 w-5 ${
                        plan.recommended
                          ? "text-violet-600"
                          : "text-purple-500"
                      }`}
                    />
                    <span className="text-gray-700">{feature.text}</span>
                  </li>
                ))}
              </ul>
              <Link href="/login" className="block">
                <Button
                  variant={plan.buttonVariant}
                  className={`w-full py-6 text-lg ${
                    plan.recommended
                      ? "bg-gradient-to-r from-violet-600 to-purple-500 text-white hover:from-violet-700 hover:to-purple-600"
                      : "border-2 border-gray-300 hover:border-violet-400 hover:bg-violet-50"
                  }`}
                >
                  {plan.buttonText}
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
