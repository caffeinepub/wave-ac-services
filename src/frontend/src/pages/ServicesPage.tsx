import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRightLeft,
  CalendarCheck,
  CheckCircle2,
  ChevronRight,
  Droplets,
  Grid3X3,
  IndianRupee,
  MessageCircle,
  Phone,
  Settings,
  Shield,
  Sparkles,
  ThumbsUp,
  Timer,
  Wallet,
  Wind,
  Wrench,
  Zap,
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

const categoryTabMeta: Record<
  ServiceCategory,
  { icon: React.ElementType; label: string; count: number }
> = {
  All: { icon: Grid3X3, label: "All Services", count: 6 },
  Installation: { icon: Wrench, label: "Installation", count: 2 },
  "Repair & Maintenance": {
    icon: Settings,
    label: "Repair & Maintenance",
    count: 2,
  },
  "Cleaning & Gas": { icon: Droplets, label: "Cleaning & Gas", count: 2 },
};

const services = [
  {
    icon: Wrench,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    title: "AC Installation",
    category: "Installation" as ServiceCategory,
    description:
      "Naya AC ek dum sahi tarike se install karein — sabhi brands ke liye expert hands.",
    features: [
      "Sabhi brands ke liye",
      "Wall/window mounting",
      "Power check included",
      "1 year installation warranty",
    ],
    price: "₹799 se shuru",
    duration: "2-3 hours",
  },
  {
    icon: Zap,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    title: "AC Repair & Service",
    category: "Repair & Maintenance" as ServiceCategory,
    description:
      "Kharab AC ko jaldi theek karein — sabhi problems solve, sabhi brands supported.",
    features: [
      "Same day diagnosis",
      "Sabhi brands supported",
      "Genuine spare parts",
      "Service guarantee",
    ],
    price: "₹299 se shuru",
    duration: "1-2 hours",
  },
  {
    icon: CalendarCheck,
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
    title: "Annual Maintenance (AMC)",
    category: "Repair & Maintenance" as ServiceCategory,
    description:
      "Saal bhar AC ki dekhbhal — tension free rahein, priority support milega.",
    features: [
      "4 free services/year",
      "Priority support",
      "Parts discount 10%",
      "Remote assistance",
    ],
    price: "₹999/year se shuru",
    duration: "Annual plan",
  },
  {
    icon: Wind,
    iconBg: "bg-cyan-50",
    iconColor: "text-cyan-600",
    title: "Gas Refilling",
    category: "Cleaning & Gas" as ServiceCategory,
    description:
      "AC ki cooling power wapas laao — R-22 & R-32 gas available, leak check included.",
    features: [
      "R-22 & R-32 gas available",
      "Leak check included",
      "Pressure testing",
      "90 day guarantee",
    ],
    price: "₹800 se shuru",
    duration: "1-1.5 hours",
  },
  {
    icon: Sparkles,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
    title: "AC Deep Cleaning",
    category: "Cleaning & Gas" as ServiceCategory,
    description:
      "Filter, coil, drain — poora AC andar se saaf, better cooling efficiency guaranteed.",
    features: [
      "Deep jet cleaning",
      "Anti-bacterial spray",
      "Drain cleaning",
      "Better cooling efficiency",
    ],
    price: "₹399 se shuru",
    duration: "1-2 hours",
  },
  {
    icon: ArrowRightLeft,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
    title: "Uninstallation & Shifting",
    category: "Installation" as ServiceCategory,
    description:
      "AC shift karo bina damage ke — careful dismounting, safe aur fast service.",
    features: [
      "Careful dismounting",
      "Safe transport ready",
      "Reinstallation option",
      "No damage guarantee",
    ],
    price: "₹499 se shuru",
    duration: "1-2 hours",
  },
];

const trustBadges = [
  { icon: Shield, label: "10+ Years Experience" },
  { icon: ThumbsUp, label: "Genuine Parts" },
  { icon: CalendarCheck, label: "7 Days Available" },
  { icon: Wallet, label: "Affordable Prices" },
];

const heroStats = [
  { value: "6+", label: "Services" },
  { value: "500+", label: "Customers" },
  { value: "10+", label: "Years" },
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

      const buffer = ctx.createBuffer(1, bufferSize, sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const source = ctx.createBufferSource();
      source.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = 1200;
      filter.Q.value = 1.2;

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
      source.onended = () => ctx.close();
    } catch {
      // Silently ignore
    }
  };

  const handleBookNow = (title: string) => {
    playWindSound();
    setClickedCard(title);
    setTimeout(() => setClickedCard(null), 700);
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
      {/* Hero Banner */}
      <section
        className="relative overflow-hidden py-16 sm:py-20"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.28 0.13 245) 0%, oklch(0.38 0.12 245) 50%, oklch(0.50 0.11 245) 100%)",
        }}
      >
        {/* Decorative circles */}
        <div
          className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-10 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, oklch(0.85 0.06 220), transparent)",
            transform: "translate(30%, -30%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-10 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, oklch(0.75 0.08 220), transparent)",
            transform: "translate(-30%, 30%)",
          }}
        />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm text-white/90 mb-5 font-medium border border-white/20">
            <Settings className="w-3.5 h-3.5" />
            Delhi ke Best AC Technicians
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight mb-3">
            Hamare AC Services
          </h1>
          <p className="text-white/75 text-base sm:text-lg mb-8 max-w-lg mx-auto">
            Delhi ke best AC technicians — 10+ saal ka experience, har problem
            ka solution
          </p>

          {/* Hero Stats */}
          <div className="flex justify-center gap-6 sm:gap-12">
            {heroStats.map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">
                  {value}
                </div>
                <div className="text-xs sm:text-sm text-white/65 font-medium mt-0.5">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="sticky top-0 z-20 bg-card border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div
            className="flex gap-2 overflow-x-auto py-3"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            data-ocid="services.tab"
          >
            {CATEGORIES.map((cat) => {
              const meta = categoryTabMeta[cat];
              const Icon = meta.icon;
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  data-ocid={`services.filter.${cat.toLowerCase().replace(/[^a-z0-9]/g, "_")}.tab`}
                  className={[
                    "flex-shrink-0 inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-sm font-semibold border-2 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                    isActive
                      ? "bg-primary text-white border-primary shadow-md"
                      : "bg-background text-foreground border-border hover:border-primary/60 hover:bg-primary/5",
                  ].join(" ")}
                  aria-pressed={isActive}
                >
                  <Icon
                    className={`w-4 h-4 ${isActive ? "text-white" : "text-primary"}`}
                  />
                  <span>{meta.label}</span>
                  <Badge
                    className={[
                      "text-xs font-bold rounded-full px-1.5 py-0 min-w-[1.2rem] h-5",
                      isActive
                        ? "bg-white/25 text-white border-white/30"
                        : "bg-primary/10 text-primary border-primary/20",
                    ].join(" ")}
                    variant="outline"
                  >
                    {meta.count}
                  </Badge>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 sm:py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Active filter label */}
          {activeCategory !== "All" && (
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px flex-grow bg-border" />
              <span className="text-sm font-semibold text-primary px-4 py-1.5 bg-primary/8 rounded-full border border-primary/20 whitespace-nowrap">
                {activeCategory}
              </span>
              <div className="h-px flex-grow bg-border" />
            </div>
          )}

          {activeCategory === "All" && (
            <p className="text-center text-muted-foreground text-sm mb-8">
              Sabhi 6 services — click karein booking ke liye
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
            {filteredServices.map(
              ({
                icon: Icon,
                iconBg,
                iconColor,
                title,
                description,
                features,
                price,
                duration,
              }) => (
                <button
                  key={title}
                  type="button"
                  data-ocid={`services.item.${title.toLowerCase().replace(/[^a-z0-9]/g, "_")}`}
                  className={[
                    "relative bg-card rounded-2xl border-2 shadow-sm flex flex-col transition-all duration-200 overflow-hidden group cursor-pointer text-left w-full",
                    clickedCard === title
                      ? "border-primary shadow-lg scale-[1.03]"
                      : "border-border hover:border-primary/40 hover:shadow-md hover:scale-[1.01]",
                  ].join(" ")}
                  onClick={() => handleBookNow(title)}
                  aria-label={`Book ${title}`}
                >
                  {/* Wind burst animation */}
                  {clickedCard === title && (
                    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl z-10">
                      <div
                        className="wind-streak"
                        style={{ top: "25%", animationDelay: "0ms" }}
                      />
                      <div
                        className="wind-streak-wide"
                        style={{ top: "38%", animationDelay: "60ms" }}
                      />
                      <div
                        className="wind-streak"
                        style={{ top: "52%", animationDelay: "120ms" }}
                      />
                      <div
                        className="wind-streak-wide"
                        style={{ top: "65%", animationDelay: "180ms" }}
                      />
                      <div
                        className="wind-streak"
                        style={{ top: "78%", animationDelay: "240ms" }}
                      />
                    </div>
                  )}

                  <div className="p-6 sm:p-7 flex flex-col h-full">
                    {/* Icon + Price row */}
                    <div className="flex items-start justify-between mb-5">
                      <div
                        className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center flex-shrink-0 ${iconBg} transition-transform duration-200 group-hover:scale-110`}
                      >
                        <Icon
                          className={`w-7 h-7 sm:w-8 sm:h-8 ${iconColor}`}
                        />
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 justify-end text-green-600 font-bold text-sm">
                          <IndianRupee className="w-3.5 h-3.5" />
                          <span>{price.replace("₹", "")}</span>
                        </div>
                        <div className="flex items-center gap-1 justify-end text-muted-foreground text-xs mt-1">
                          <Timer className="w-3 h-3" />
                          {duration}
                        </div>
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="font-bold text-lg sm:text-xl text-foreground mb-2 leading-tight">
                      {title}
                    </h2>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2 mb-6 flex-grow">
                      {features.map((f) => (
                        <li
                          key={f}
                          className="flex items-center gap-2 text-sm text-foreground"
                        >
                          <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    {/* Book Now Button */}
                    <div
                      className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl font-bold py-3 text-sm transition-all flex items-center justify-center gap-2"
                      aria-hidden="true"
                    >
                      Book Now
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </button>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Trust Badges Strip */}
      <section className="py-10 bg-card border-y border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {trustBadges.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center sm:text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-semibold text-foreground leading-snug">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section
        className="py-14 sm:py-16"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.28 0.13 245) 0%, oklch(0.42 0.12 245) 100%)",
        }}
      >
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
            Abhi Call Karein ya WhatsApp Karein
          </h2>
          <p className="text-white/70 mb-8 text-sm sm:text-base">
            Free Consultation — Koi bhi AC problem, hum solve karenge
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+919871984736">
              <Button
                data-ocid="services.primary_button"
                size="lg"
                className="bg-white text-primary hover:bg-white/90 rounded-full px-8 py-6 text-base font-bold w-full sm:w-auto shadow-lg"
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
                className="rounded-full px-8 py-6 text-base font-bold w-full sm:w-auto text-white hover:opacity-90 shadow-lg"
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
