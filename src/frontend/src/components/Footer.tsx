import { MapPin, MessageCircle, Phone } from "lucide-react";

type Page = "home" | "services" | "why-us" | "testimonials" | "contact";

interface FooterProps {
  onNavigate: (page: Page) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const year = new Date().getFullYear();

  const handleNav = (page: Page) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-brand-deep text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <img
                src="https://i.ibb.co/zwQng6T/415d22c4-cfad-4ae7-8f33-99ee86d12c24-removebg-preview.png"
                alt="Wave Air Conditioning Services Logo"
                className="h-12 w-auto object-contain brightness-0 invert"
              />
              <div className="flex flex-col leading-tight">
                <span className="text-xl font-extrabold text-white tracking-tight">
                  Wave Air
                </span>
                <span className="text-sm font-semibold text-white/70 tracking-wide">
                  Conditioning Services
                </span>
              </div>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              Fast and reliable AC repair, installation, gas filling, and
              maintenance services across Delhi at affordable prices.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-white/90">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {(
                [
                  "home",
                  "services",
                  "why-us",
                  "testimonials",
                  "contact",
                ] as Page[]
              ).map((page) => (
                <li key={page}>
                  <button
                    type="button"
                    onClick={() => handleNav(page)}
                    className="text-sm text-white/70 hover:text-white transition-colors capitalize"
                  >
                    {page === "why-us"
                      ? "Why Us"
                      : page.charAt(0).toUpperCase() + page.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-white/90">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+919871984736"
                  className="flex items-center gap-2.5 text-sm text-white/70 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  +91-9871984736
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/919871984736"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm hover:text-white transition-colors"
                  style={{ color: "#25D366" }}
                >
                  <MessageCircle className="w-4 h-4 flex-shrink-0" />
                  WhatsApp Us
                </a>
              </li>
              <li>
                <a
                  href="https://maps.app.goo.gl/a4eee5jsRLvhX6nHA?g_st=aw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 text-sm text-white/70 hover:text-white transition-colors"
                >
                  <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  Find us on Google Maps
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-white/60">
            © {year} Wave Air Conditioning Services. All rights reserved.
          </p>
          <p className="text-sm text-white/50">
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white/80 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
