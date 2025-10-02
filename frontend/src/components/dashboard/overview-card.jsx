import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function OverviewCard({ title, content }) {
  return (
    <Card>
      <CardHeader>
        <p className="text-sm text-muted-foreground">{title}</p>
      </CardHeader>
      <CardContent>
        <p className="text-lg font-semibold">{content}</p>
      </CardContent>
    </Card>
  );
}
