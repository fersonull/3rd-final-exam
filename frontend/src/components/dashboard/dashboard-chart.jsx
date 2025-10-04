import { useState } from "react";
import InfoChart from "./info-chart";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";

export default function DashboardChart() {
  const [range, setRange] = useState("7d");

  return (
    <Card className="md:h-full h-80">
      <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <CardTitle>
            {range === "7d"
              ? "Your last 7-day activities"
              : "Your last 1-month activities"}
          </CardTitle>
          <CardDescription>
            {range === "7d"
              ? "Showing your recent activities within week"
              : "Showing your recent activities within month"}
          </CardDescription>
        </div>
            

        <div className="md:px-6 md:pt-2 p-0 w-full md:w-auto flex justify-start">
          <Select value={range} onValueChange={setRange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">7 Days</SelectItem>
              <SelectItem value="1m">1 Month</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="w-full h-full font-medium text-xs">
        <InfoChart range={range} />
      </CardContent>
    </Card>
  );
}
