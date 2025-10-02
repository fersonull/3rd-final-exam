import { useAuthContext } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { useFetch } from "@/hooks/use-fetch";
import { useNavigate } from "react-router-dom";
import OverviewCard from "@/components/dashboard/overview-card";
import DashboardChart from "@/components/dashboard/dashboard-chart";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function Index() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { refetch: logout, loading: loggingOut } = useFetch(
    "/logout",
    { method: "POST" },
    false
  );

  const handleLogout = async () => {
    await logout();
    navigate("/auth");
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        <div className="grid md:grid-cols-3 gap-4">
          <OverviewCard title="Total projects" content={200} />
          <OverviewCard title="Ongoing projects" content={12} />
          <OverviewCard title="Finished projects" content={188} />
        </div>

        <div className="grid lg:grid-cols-3 gap-4">
          <div className="col-span-2">
            <Card>
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
              <CardContent className="w-full h-64 font-medium text-xs">
                <DashboardChart />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex-col-center">
                <div className="flex flex-1 flex-col gap-1 w-full">
                  <CardTitle>Your recent contributions</CardTitle>
                  <CardDescription>
                    Showing your recent contributions to the team
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="w-full h-64 font-medium text-xs">
              {/* <DashboardChart /> */}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
