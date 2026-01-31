import { Loader2 } from "lucide-react";

interface DashboardLoadingProps {
  size?: "sm" | "md" | "lg";
}

export function DashboardLoading({ size = "md" }: DashboardLoadingProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className="flex justify-center py-12">
      <Loader2
        className={`${sizeClasses[size]} animate-spin text-violet-600`}
      />
    </div>
  );
}
