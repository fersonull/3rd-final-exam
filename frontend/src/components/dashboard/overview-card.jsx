import { Card, CardContent, CardHeader } from "../ui/card";

export default function OverviewCard({ title, content, icon }) {
  return (
    <Card>
      <CardHeader>
        <span className="flex items-center gap-2">
          {icon}
          <p className="text-sm text-muted-foreground">{title}</p>
        </span>
      </CardHeader>
      <CardContent>
        <p className="text-lg font-semibold">{content}</p>
      </CardContent>
    </Card>
  );
}
