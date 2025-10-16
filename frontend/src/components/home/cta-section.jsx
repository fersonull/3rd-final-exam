import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-20 bg-primary">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="flex gap-1 text-primary-foreground">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
          </div>

          <h2 className="headings-2 mb-6 text-primary-foreground">
            Ready to transform your team's productivity?
          </h2>

          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto text-primary-foreground">
            Join thousands of teams who have already discovered the power of
            organized, efficient project management. Start your free trial
            today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link to={"/auth?tab=register"}>
              <Button
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto text-primary hover:text-primary"
              >
                Start Free Trial
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to={"/auth?tab=login"}>
              <Button
                size="lg"
                variant="ghost"
                className="w-full sm:w-auto text-primary-foreground"
              >
                Sign In
              </Button>
            </Link>
          </div>

          <p className="text-sm opacity-75 text-primary-foreground">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
}
