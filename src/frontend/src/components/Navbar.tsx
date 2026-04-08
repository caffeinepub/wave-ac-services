import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

type Page = "home" | "services" | "why-us" | "testimonials" | "contact";

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const navLinks: { label: string; page: Page }[] = [
  { label: "Home", page: "home" },
  { label: "Services", page: "services" },
  { label: "Why Us", page: "why-us" },
  { label: "Testimonials", page: "testimonials" },
  { label: "Contact", page: "contact" },
];

export function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (page: Page) => {
    onNavigate(page);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white navbar-3d">
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo / Brand Name */}
        <button
          type="button"
          onClick={() => handleNav("home")}
          className="flex items-center gap-2 group"
          data-ocid="nav.link"
          aria-label="Wave Air Conditioning Services - Go to home"
        >
          <img
            src="https://i.ibb.co/zwQng6T/415d22c4-cfad-4ae7-8f33-99ee86d12c24-removebg-preview.png"
            alt="Wave Air Conditioning Services Logo"
            className="h-12 w-auto object-contain"
          />
          <div className="flex flex-col leading-tight">
            <span className="text-xl font-extrabold text-primary tracking-tight">
              Wave Air
            </span>
            <span className="text-sm font-semibold text-foreground/70 tracking-wide">
              Conditioning Services
            </span>
          </div>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(({ label, page }) => (
            <button
              type="button"
              key={page}
              onClick={() => handleNav(page)}
              data-ocid="nav.link"
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors relative ${
                currentPage === page
                  ? "text-primary"
                  : "text-foreground hover:text-primary"
              }`}
            >
              {label}
              {currentPage === page && (
                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <Button
            onClick={() => handleNav("contact")}
            data-ocid="nav.primary_button"
            className="bg-primary hover:bg-primary/90 text-white rounded-full px-5 text-sm font-semibold btn-3d"
          >
            Book a Service
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden p-2 rounded-md text-foreground hover:text-primary transition-colors"
          onClick={() => setMobileOpen((v) => !v)}
          data-ocid="nav.toggle"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-border px-4 pb-4 pt-2 shadow-lg">
          <div className="flex flex-col gap-1">
            {navLinks.map(({ label, page }) => (
              <button
                type="button"
                key={page}
                onClick={() => handleNav(page)}
                data-ocid="nav.link"
                className={`w-full text-left px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                  currentPage === page
                    ? "bg-brand-pale text-primary"
                    : "text-foreground hover:bg-brand-pale hover:text-primary"
                }`}
              >
                {label}
              </button>
            ))}
            <Button
              onClick={() => handleNav("contact")}
              data-ocid="nav.primary_button"
              className="mt-2 w-full bg-primary hover:bg-primary/90 text-white rounded-full font-semibold"
            >
              Book a Service
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
