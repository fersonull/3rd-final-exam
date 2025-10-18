import { CheckCircle, Users, BarChart3, Shield, Zap } from "lucide-react";

export default function AuthHero() {
  const benefits = [
    {
      icon: <Users className="w-5 h-5" />,
      text: "Collaborate with your team in real-time",
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      text: "Track progress with powerful analytics",
    },
    {
      icon: <Shield className="w-5 h-5" />,
      text: "Enterprise-grade security & reliability",
    },
    {
      icon: <Zap className="w-5 h-5" />,
      text: "Lightning-fast performance",
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center h-full px-8 py-12 text-center bg-gradient-to-br from-primary to-primary/90">
      <div className="max-w-md">
        {/* Logo/Brand */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary-foreground mb-2">
            Welcome to Projet
          </h1>
          <p className="text-primary-foreground/80 text-lg">
            The modern project management platform
          </p>
        </div>

        {/* Benefits List */}
        <div className="space-y-4 mb-8 flex-center flex-col">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-3 text-left">
              <div className="text-primary-foreground/90 flex-shrink-0">
                {benefit.icon}
              </div>
              <p className="text-primary-foreground/90 text-sm">
                {benefit.text}
              </p>
            </div>
          ))}
        </div>

        {/* Stats or Social Proof */}
        <div className="border-t border-primary-foreground/20 pt-6">
          <div className="grid grid-cols-2 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-primary-foreground">
                10K+
              </div>
              <div className="text-xs text-primary-foreground/70">
                Active Teams
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary-foreground">
                99.9%
              </div>
              <div className="text-xs text-primary-foreground/70">Uptime</div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-8">
          <p className="text-xs text-primary-foreground/60 mb-3">
            Trusted by teams at
          </p>
          <div className="flex justify-center items-center gap-4 opacity-60">
            <div className="w-16 h-8 bg-primary-foreground/20 rounded flex items-center justify-center">
              <span className="text-xs font-semibold text-primary-foreground">
                JobFinder
              </span>
            </div>
            <div className="w-16 h-8 bg-primary-foreground/20 rounded flex items-center justify-center">
              <span className="text-xs font-semibold text-primary-foreground">
                StartupX
              </span>
            </div>
            <div className="w-16 h-8 bg-primary-foreground/20 rounded flex items-center justify-center">
              <span className="text-xs font-semibold text-primary-foreground">
                Innovate
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
