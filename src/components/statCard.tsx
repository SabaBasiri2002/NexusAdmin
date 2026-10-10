import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";    

type StatCardProps = {
  title: string;
  value: string;
  change: string;
  description: string;
  icon: LucideIcon;
  trend: "up" | "down";
};

export default function StatCard({
  title,
  value,
  change,
  description,
  icon: Icon,
  trend,
}: StatCardProps) {
  const isPositive = trend === "up";

  return (
    <Card data-scroll-reveal="card" className="group relative overflow-hidden border-border/70 bg-card/70 shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-border hover:shadow-lg">
      <div data-scroll-parallax="14" className="pointer-events-none absolute -right-8 -top-8 size-24 rounded-full bg-sky-500/10 blur-2xl" />
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>

        <div className="flex size-10 items-center justify-center rounded-xl border border-border/60 bg-muted/40 transition-colors group-hover:bg-muted">
          <Icon className="size-4.5 text-foreground" />
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-2xl font-semibold tracking-tight md:text-3xl">
              {value}
            </p>

            <div className="mt-2 flex items-center gap-2">
              <span
                className={[
                  "inline-flex items-center gap-1 text-xs font-medium",
                  isPositive
                    ? "text-emerald-500"
                    : "text-red-500",
                ].join(" ")}
              >
                {isPositive ? (
                  <ArrowUpRight className="size-3.5" />
                ) : (
                  <ArrowDownRight className="size-3.5" />
                )}

                {change}
              </span>

              <span className="text-xs text-muted-foreground">
                {description}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
