import { Button } from "../ui/button";
import useResponsive from "@/hooks/use-responsive";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function HomeHero() {
  const { isMobile } = useResponsive();

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Subtle Circle Background */}
      <div className="absolute inset-0 bg-background">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-primary/8 rounded-full blur-lg"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-primary/3 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-primary/6 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/2 rounded-full blur-3xl"></div>
      </div>
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="headings mb-6">
              Supercharge Your Teamwork with{" "}
              <span className="text-primary">Projet</span>
            </h1>
            <p className="sub-headings text-lg max-w-2xl mx-auto">
              The modern project management platform that helps teams organize
              tasks, track progress, and collaborate seamlessly—all in one
              place.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="text-left">
                  <h3 className="font-semibold">Organize with Ease</h3>
                  <p className="text-sm text-muted-foreground">
                    Create projects, assign tasks, and track progress with
                    intuitive tools
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="text-left">
                  <h3 className="font-semibold">Real-time Collaboration</h3>
                  <p className="text-sm text-muted-foreground">
                    Work together seamlessly whether you're in the office or
                    remote
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="text-left">
                  <h3 className="font-semibold">Visual Progress Tracking</h3>
                  <p className="text-sm text-muted-foreground">
                    Monitor deadlines and milestones with beautiful charts and
                    dashboards
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="text-left">
                  <h3 className="font-semibold">Smart Notifications</h3>
                  <p className="text-sm text-muted-foreground">
                    Stay updated with instant alerts and intelligent reminders
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={"/auth?tab=register"}>
              <Button
                size={isMobile ? "sm" : "lg"}
                className="w-full sm:w-auto"
              >
                Get started for free
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to={"/auth?tab=login"}>
              <Button
                variant="outline"
                size={isMobile ? "sm" : "lg"}
                className="w-full sm:w-auto"
              >
                Sign in
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
