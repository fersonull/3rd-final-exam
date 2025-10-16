import { Link } from "react-router-dom";
import { PanelRightOpen, Workflow, Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import { useAuthContext } from "@/contexts/auth-context";
import { useState } from "react";

export default function HomeNavbar() {
  const { isAuthenticated } = useAuthContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationLinks = [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="flex-center lg:px-24 px-4 py-4">
        <div className="flex-between w-full">
          {/* Logo */}
          <Link to="/" className="logo text-xl">
            Projet
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-6">
              {navigationLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="flex gap-2">
              {isAuthenticated ? (
                <Link to="p">
                  <Button>
                    <Workflow className="w-4 h-4 mr-2" />
                    Go to workspace
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to={"/auth?tab=login"}>
                    <Button size="sm" variant="ghost">
                      Login
                    </Button>
                  </Link>
                  <Link to={"/auth?tab=register"}>
                    <Button size="sm">Get started</Button>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b shadow-lg">
            <div className="px-4 py-6 space-y-4">
              {navigationLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}

              <div className="pt-4 border-t">
                {isAuthenticated ? (
                  <Link to="p" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full">
                      <Workflow className="w-4 h-4 mr-2" />
                      Go to workspace
                    </Button>
                  </Link>
                ) : (
                  <div className="flex gap-2">
                    <Link
                      to={"/auth?tab=login"}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Button variant="ghost" className="flex-1">
                        Login
                      </Button>
                    </Link>
                    <Link
                      to={"/auth?tab=register"}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Button className="flex-1">Get started</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
