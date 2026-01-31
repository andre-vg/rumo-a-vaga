import Link from "next/link";
import { BookOpen } from "lucide-react";

interface FooterProps {
  brandName: string;
  copyright: string;
}

export function Footer({ brandName, copyright }: FooterProps) {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-purple-500">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-violet-700 to-purple-600 bg-clip-text text-xl font-bold text-transparent">
              {brandName}
            </span>
          </div>
          <p className="text-sm text-gray-500">{copyright}</p>
        </div>
      </div>
    </footer>
  );
}
