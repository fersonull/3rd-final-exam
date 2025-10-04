import InfoChart from "./info-chart";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";

export default function DashboardChart() {
  return (
    <Card className="md:h-full h-80">
      <CardHeader>
        <div className="flex-col-center">
          <div className="flex flex-1 flex-col gap-1 w-full">
            <CardTitle>Your last 7-day activities</CardTitle>
            <CardDescription>
              Showing your recent activies within week
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="w-full h-full font-medium text-xs">
        <InfoChart />
      </CardContent>
    </Card>
  );
}
