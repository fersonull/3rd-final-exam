import {
  Users,
  BarChart3,
  Calendar,
  MessageSquare,
  Shield,
  Zap,
  CheckSquare,
  Clock,
  Target,
} from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Team Collaboration",
      description:
        "Invite team members, assign roles, and collaborate in real-time on projects and tasks.",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Analytics & Insights",
      description:
        "Track project progress with detailed analytics, charts, and performance metrics.",
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Smart Scheduling",
      description:
        "Plan and schedule tasks with our intelligent calendar and deadline management.",
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Communication Hub",
      description:
        "Stay connected with built-in messaging, comments, and notification systems.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure & Reliable",
      description:
        "Enterprise-grade security with data encryption and secure cloud storage.",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description:
        "Optimized for speed with instant updates and real-time synchronization.",
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="headings-2 mb-4">
            Everything you need to manage projects
          </h2>
          <p className="sub-headings-2 max-w-2xl mx-auto">
            Powerful features designed to streamline your workflow and boost
            team productivity
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card p-6 rounded-lg border hover:shadow-md transition-shadow"
            >
              <div className="text-primary mb-4">{feature.icon}</div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3">
              <CheckSquare className="w-5 h-5 text-primary" />
              <span className="font-medium">Task Management</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Clock className="w-5 h-5 text-primary" />
              <span className="font-medium">Time Tracking</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Target className="w-5 h-5 text-primary" />
              <span className="font-medium">Goal Setting</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
