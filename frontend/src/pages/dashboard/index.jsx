import { useAuthContext } from "@/contexts/auth-context";
import { useFetch } from "@/hooks/use-fetch";
import { useNavigate } from "react-router-dom";
import OverviewCard from "@/components/dashboard/overview-card";
import { CheckCircle, Folders, FolderClockIcon } from "lucide-react";
import DashboardChart from "@/components/dashboard/dashboard-chart";
import DashboardTable from "@/components/dashboard/dashboard-table";
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
        <div className="grid md:grid-cols-3 grid-cols-2 gap-4">
          <OverviewCard
            title="Total tasks"
            content={200}
            icon={<Folders color="blue" />}
          />
          <OverviewCard
            title="Ongoing tasks"
            content={12}
            icon={<FolderClockIcon color="orange" />}
          />
          <OverviewCard
            title="Completed tasks"
            content={188}
            icon={<CheckCircle color="green" />}
          />
        </div>

        <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
          <div className="lg:col-span-2">
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
            <CardContent className="w-full font-medium text-xs">
              {/* <DashboardChart /> */}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent>
            <DashboardTable />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
