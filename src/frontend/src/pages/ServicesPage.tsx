import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowUpDown,
  ChevronRight,
  Droplets,
  Layers,
  MessageCircle,
  Phone,
  Settings,
  Shield,
  Thermometer,
  Wind,
  Wrench,
} from "lucide-react";
import { useState } from "react";

type Page = "home" | "services" | "why-us" | "testimonials" | "contact";

interface ServicesPageProps {
  onNavigate: (page: Page) => void;
  onBookService?: (service: string) => void;
}

type ServiceCategory =
  | "All"
  | "Installation"
  | "Repair & Maintenance"
  | "Cleaning & Gas";

const CATEGORIES: ServiceCategory[] = [
  "All",
  "Installation",
  "Repair & Maintenance",
  "Cleaning & Gas",
];

const categoryMeta: Record<
  ServiceCategory,
  { icon: React.ElementType; description: string; count: number; color: string }
> = {
  All: {
    icon: Layers,
    description: "Complete range of AC services for home & office",
    count: 6,
    color: "bg-primary/10 text-primary border-primary/20",
  },
  Installation: {
    icon: Wind,
    description: "New AC installation, shifting & uninstallation",
    count: 2,
    color: "bg-blue-50 text-blue-700 border-blue-100",
  },
  "Repair & Maintenance": {
    icon: Wrench,
    description: "Repair, servicing & AMC plans for all brands",
    count: 2,
    color: "bg-amber-50 text-amber-700 border-amber-100",
  },
  "Cleaning & Gas": {
    icon: Droplets,
    description: "Deep cleaning, gas refilling & refrigerant top-up",
    count: 2,
    color: "bg-teal-50 text-teal-700 border-teal-100",
  },
};

const services = [
  {
    icon: Wind,
    title: "AC Installation",
    category: "Installation" as ServiceCategory,
    description:
      "Professional installation of all major AC brands — Samsung, LG, Daikin, Voltas, Hitachi, Carrier, and more. We handle split, window, cassette, and tower units with precision and care.",
    features: [
      "All brands & models",
      "Free demo & guide",
      "Expert technicians",
      "Clean installation",
    ],
  },
  {
    icon: Wrench,
    title: "AC Repair & Service",
    category: "Repair & Maintenance" as ServiceCategory,
    description:
      "Expert diagnosis and repair for all AC problems — not cooling, unusual noise, water leakage, tripping, sensor issues, and more. Our certified technicians carry all common spare parts.",
    features: [
      "Genuine spare parts",
      "All brands covered",
      "Fast turnaround",
      "Expert diagnosis",
    ],
  },
  {
    icon: Shield,
    title: "Annual Maintenance Contract",
    category: "Repair & Maintenance" as ServiceCategory,
    description:
      "Keep your AC in top condition year-round with our AMC plans. Regular servicing, priority booking, discounted repairs, and free filter cleaning included. Best value for regular users.",
    features: [
      "2 free services/year",
      "Priority booking",
      "20% repair discount",
      "Free filter cleaning",
    ],
  },
  {
    icon: Thermometer,
    title: "Gas Refilling",
    category: "Cleaning & Gas" as ServiceCategory,
    description:
      "Certified AC gas refilling with genuine refrigerant (R-22, R-32, R-410A). We check for leaks before refilling and ensure proper pressure levels for maximum efficiency.",
    features: [
      "Genuine refrigerant",
      "Leak detection included",
      "Pressure testing",
      "All refrigerant types",
    ],
  },
  {
    icon: Droplets,
    title: "AC Deep Cleaning",
    category: "Cleaning & Gas" as ServiceCategory,
    description:
      "Complete foam jet cleaning of indoor and outdoor units, coil washing, drain pipe cleaning, and sanitization. Improves cooling efficiency by up to 30% and eliminates bacteria.",
    features: [
      "Foam jet cleaning",
      "Coil & drain wash",
      "Sanitization",
      "Efficiency boost",
    ],
  },
  {
    icon: ArrowUpDown,
    title: "Uninstallation & Shifting",
    category: "Installation" as ServiceCategory,
    description:
      "Safe removal and reinstallation of AC units when you're moving home or office. We handle disconnection, transportation support, and reinstallation at the new location.",
    features: [
      "Safe removal",
      "Pipe capping",
      "New location setup",
      "Professional handling",
    ],
  },
];

export function ServicesPage({ onNavigate, onBookService }: ServicesPageProps) {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>("All");
  const [clickedCard, setClickedCard] = useState<string | null>(null);

  const filteredServices =
    activeCategory === "All"
      ? services
      : services.filter((s) => s.category === activeCategory);

  const playWindSound = () => {
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as Window & { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioContextClass) return;

      const ctx = new AudioContextClass();
      const duration = 0.5;
      const sampleRate = ctx.sampleRate;
      const bufferSize = sampleRate * duration;

      // White noise buffer
      const buffer = ctx.createBuffer(1, bufferSize, sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const source = ctx.createBufferSource();
      source.buffer = buffer;

      // Bandpass filter — higher frequency for sharper, louder wind
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = 1200;
      filter.Q.value = 1.2;

      // Gain envelope: fast ramp up loud, quick fade
      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(1.4, ctx.currentTime + 0.04);
      gainNode.gain.linearRampToValueAtTime(1.0, ctx.currentTime + 0.15);
      gainNode.gain.exponentialRampToValueAtTime(
        0.001,
        ctx.currentTime + duration,
      );

      source.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      source.start();
      source.stop(ctx.currentTime + duration);

      source.onended = () => {
        ctx.close();
      };
    } catch {
      // Silently ignore if Web Audio API is not supported
    }
  };

  const handleBookNow = (title: string) => {
    // Play wind sound effect
    playWindSound();

    // Trigger wind animation
    setClickedCard(title);
    setTimeout(() => setClickedCard(null), 700);

    // Navigate to booking after a brief delay for animation
    setTimeout(() => {
      if (onBookService) {
        onBookService(title);
      } else {
        onNavigate("contact");
      }
    }, 350);
  };

  return (
    <main>
      {/* Page Header */}
      <section
        className="py-14 sm:py-16 text-white"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.32 0.12 245) 0%, oklch(0.45 0.12 245) 100%)",
        }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 rounded-full px-3 py-1 text-sm text-white/90 mb-4 font-medium">
            <Settings className="w-3.5 h-3.5" />6 Services Available
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            Our AC Services
          </h1>
          <p className="text-white/80 text-base sm:text-lg">
            Complete air conditioning solutions for homes and businesses across
            Delhi NCR
          </p>
        </div>
      </section>

      {/* Category Summary Cards */}
      <section className="py-10 sm:py-12 bg-brand-pale border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-7">
            <h2 className="text-lg sm:text-xl font-bold text-foreground">
              Browse by Category
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              Tap a category to filter services
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {CATEGORIES.map((cat) => {
              const meta = categoryMeta[cat];
              const Icon = meta.icon;
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  data-ocid={`services.${cat.toLowerCase().replace(/[^a-z0-9]/g, "_")}.tab`}
                  className={[
                    "rounded-2xl border-2 p-4 text-left transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary group",
                    isActive
                      ? "bg-primary border-primary text-white shadow-md scale-[1.02]"
                      : "bg-white border-border hover:border-primary/40 hover:shadow-sm",
                  ].join(" ")}
                  aria-pressed={isActive}
                >
                  <div
                    className={[
                      "w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-colors duration-200",
                      isActive ? "bg-white/20" : "bg-primary/10",
                    ].join(" ")}
                  >
                    <Icon
                      className={[
                        "w-5 h-5 transition-colors duration-200",
                        isActive ? "text-white" : "text-primary",
                      ].join(" ")}
                    />
                  </div>
                  <div className="flex items-start justify-between gap-1 mb-1">
                    <span
                      className={[
                        "font-bold text-sm leading-tight",
                        isActive ? "text-white" : "text-foreground",
                      ].join(" ")}
                    >
                      {cat}
                    </span>
                    <Badge
                      className={[
                        "text-xs font-bold flex-shrink-0 rounded-full px-2",
                        isActive
                          ? "bg-white/20 text-white border-white/30"
                          : "bg-primary/10 text-primary border-primary/20",
                      ].join(" ")}
                      variant="outline"
                    >
                      {meta.count}
                    </Badge>
                  </div>
                  <p
                    className={[
                      "text-xs leading-snug line-clamp-2",
                      isActive ? "text-white/80" : "text-muted-foreground",
                    ].join(" ")}
                  >
                    {meta.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter Tabs */}
          <div className="mb-10 -mx-4 px-4 sm:mx-0 sm:px-0">
            <div
              className="flex gap-2 overflow-x-auto pb-2"
              data-ocid="services.tab"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat;
                const count = categoryMeta[cat].count;
                return (
                  <button
                    type="button"
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    data-ocid={`services.filter.${cat.toLowerCase().replace(/[^a-z0-9]/g, "_")}.tab`}
                    className={[
                      "flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                      isActive
                        ? "bg-primary text-white border-primary shadow-sm"
                        : "bg-white text-primary border-border hover:border-primary hover:bg-brand-pale",
                    ].join(" ")}
                    aria-pressed={isActive}
                  >
                    {cat}
                    <span
                      className={[
                        "inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold",
                        isActive
                          ? "bg-white/25 text-white"
                          : "bg-primary/10 text-primary",
                      ].join(" ")}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Category Label */}
          {activeCategory !== "All" && (
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px flex-grow bg-border" />
              <span className="text-sm font-semibold text-primary px-3 py-1 bg-primary/8 rounded-full border border-primary/20">
                {activeCategory}
              </span>
              <div className="h-px flex-grow bg-border" />
            </div>
          )}

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredServices.map(
              ({ icon: Icon, title, description, features }, idx) => (
                <div
                  key={title}
                  data-ocid={`services.item.${idx + 1}`}
                  className="relative bg-white rounded-2xl border border-border shadow-card p-8 sm:p-10 flex flex-col hover:shadow-md hover:border-brand-mid transition-all duration-200 overflow-hidden"
                >
                  {/* Wind burst animation overlay */}
                  {clickedCard === title && (
                    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
                      <div
                        className="wind-streak"
                        style={{ top: "28%", animationDelay: "0ms" }}
                      />
                      <div
                        className="wind-streak-wide"
                        style={{ top: "38%", animationDelay: "60ms" }}
                      />
                      <div
                        className="wind-streak"
                        style={{ top: "50%", animationDelay: "120ms" }}
                      />
                      <div
                        className="wind-streak-wide"
                        style={{ top: "62%", animationDelay: "180ms" }}
                      />
                      <div
                        className="wind-streak"
                        style={{ top: "72%", animationDelay: "240ms" }}
                      />
                    </div>
                  )}

                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-brand-pale flex items-center justify-center flex-shrink-0">
                      <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
                    </div>
                    <div>
                      <h2 className="font-bold text-xl sm:text-2xl text-foreground">
                        {title}
                      </h2>
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-5 flex-grow">
                    {description}
                  </p>
                  <ul className="space-y-1.5 mb-6">
                    {features.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-2 text-sm sm:text-base text-foreground"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={() => handleBookNow(title)}
                    data-ocid="services.primary_button"
                    className="w-full bg-primary hover:bg-primary/90 text-white rounded-full font-semibold py-5 text-base transition-transform active:scale-95"
                  >
                    Book Now
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-brand-pale py-14 border-t border-border">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
            Not Sure Which Service You Need?
          </h2>
          <p className="text-muted-foreground mb-8 text-sm sm:text-base">
            Call us and our experts will diagnose your AC problem for free.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+919871984736">
              <Button
                data-ocid="services.primary_button"
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white rounded-full px-10 py-6 text-lg font-bold w-full sm:w-auto"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call +91-9871984736
              </Button>
            </a>
            <a
              href="https://wa.me/919871984736"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                data-ocid="services.secondary_button"
                size="lg"
                className="rounded-full px-10 py-6 text-lg font-bold w-full sm:w-auto text-white hover:opacity-90"
                style={{ backgroundColor: "#25D366" }}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp Us
              </Button>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
