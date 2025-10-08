import { Button } from "../ui/button";
import useResponsive from "@/hooks/use-responsive";
import { Link } from "react-router-dom";

export default function HomeHero() {
  const { isMobile } = useResponsive();

  return (
    <>
      <div className="max-w-lg col-span-2 font-outfit">
        <h1 className="headings">Supercharge Your Teamwork with Nebulo</h1>
        <p className="sub-headings mt-2">
          Nebulo is a modern project management and collaboration platform
          designed to help teams organize tasks, track progress, and communicate
          seamlessly—all in one place. Plan projects, assign tasks, and stay in
          sync whether you're in the office or remote.
        </p>

        <ul className="list-disc pl-5 mt-4 text-muted-foreground text-sm space-y-1">
          <li>🗂️ Organize projects and tasks with ease</li>
          <li>👥 Collaborate in real-time with your team</li>
          <li>📈 Track progress and deadlines visually</li>
          <li>🔔 Get instant updates and notifications</li>
        </ul>

        <Link to={"/auth?tab=register"}>
          <Button className="mt-6" size={isMobile ? "sm" : ""}>
            Get started for free
          </Button>
        </Link>
      </div>
    </>
  );
}
