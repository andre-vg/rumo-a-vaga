import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CTASectionProps {
  title: string;
  description: string;
  buttonText: string;
}

export function CTASection({
  title,
  description,
  buttonText,
}: CTASectionProps) {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-3xl bg-gradient-to-r from-violet-600 via-purple-600 to-purple-500 p-12 text-center text-white">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">{title}</h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-white/90">
            {description}
          </p>
          <Link href="/login">
            <Button
              size="lg"
              className="rounded-xl bg-white px-8 py-6 text-lg text-violet-600 shadow-lg hover:bg-gray-100"
            >
              {buttonText}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
