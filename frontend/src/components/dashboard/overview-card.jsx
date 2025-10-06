import { Card, CardContent, CardHeader } from "../ui/card";

export default function OverviewCard({
  title,
  content,
  icon,
  description,
  trend,
  trendLabel,
}) {
  return (
    <Card>
      <CardHeader>
        <span className="flex items-center gap-2">
          {icon}
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            {description && (
              <p className="text-xs text-muted-foreground/70">{description}</p>
            )}
          </div>
        </span>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3">
          <p className="text-lg font-semibold">{content}</p>
          {typeof trend === "number" && (
            <span
              className={`flex items-center text-xs font-medium ${
                trend > 0
                  ? "text-green-600"
                  : trend < 0
                  ? "text-red-600"
                  : "text-muted-foreground"
              }`}
              title={trendLabel}
            >
              {trend > 0 ? "▲" : trend < 0 ? "▼" : ""}
              {Math.abs(trend)}%
              {trendLabel && (
                <span className="ml-1 text-muted-foreground/70">
                  {trendLabel}
                </span>
              )}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
