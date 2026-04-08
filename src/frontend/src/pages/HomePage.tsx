import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowRightLeft,
  CalendarCheck,
  CheckCircle2,
  Clock,
  Droplets,
  Loader2,
  LocateFixed,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Sparkles,
  Users,
  Wind,
  Wrench,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

type GeoStatus = "idle" | "loading" | "success" | "error";

async function reverseGeocode(lat: number, lon: number): Promise<string> {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=16&addressdetails=1`,
    { headers: { "Accept-Language": "en" } },
  );
  if (!res.ok) throw new Error("Geocode failed");
  const data = (await res.json()) as {
    display_name?: string;
    address?: {
      road?: string;
      suburb?: string;
      neighbourhood?: string;
      city_district?: string;
      city?: string;
      state?: string;
    };
  };
  const a = data.address;
  if (a) {
    const parts = [
      a.road,
      a.neighbourhood || a.suburb || a.city_district,
      a.city,
      a.state,
    ].filter(Boolean);
    if (parts.length >= 2) return parts.join(", ");
  }
  if (data.display_name)
    return data.display_name.split(",").slice(0, 4).join(", ");
  throw new Error("No address");
}
import { ACDiagram } from "../components/ACDiagram";

type Page = "home" | "services" | "why-us" | "testimonials" | "contact";

interface HomePageProps {
  onNavigate: (page: Page) => void;
  incomingService?: string;
  onClearIncomingService?: () => void;
}

const serviceCategories = [
  {
    label: "Installation Services",
    icon: Wrench,
    services: [
      {
        icon: Wrench,
        iconBg: "bg-blue-50",
        iconColor: "text-blue-600",
        title: "AC Installation",
        description:
          "Sabhi brands ke liye expert installation — split, window, cassette units.",
      },
      {
        icon: ArrowRightLeft,
        iconBg: "bg-orange-50",
        iconColor: "text-orange-600",
        title: "Uninstallation & Shifting",
        description:
          "AC shift karo bina damage ke — careful dismounting, safe aur fast.",
      },
    ],
  },
  {
    label: "Repair & Maintenance",
    icon: Zap,
    services: [
      {
        icon: Zap,
        iconBg: "bg-amber-50",
        iconColor: "text-amber-600",
        title: "AC Repair",
        description:
          "Cooling nahi, aawaz aa rahi, paani tap raha — sab theek karein.",
      },
      {
        icon: CalendarCheck,
        iconBg: "bg-green-50",
        iconColor: "text-green-600",
        title: "AC Maintenance",
        description:
          "Annual maintenance contract — saal bhar tension free rahein.",
      },
    ],
  },
  {
    label: "Cleaning & Gas",
    icon: Droplets,
    services: [
      {
        icon: Wind,
        iconBg: "bg-cyan-50",
        iconColor: "text-cyan-600",
        title: "Gas Refilling",
        description:
          "R-22, R-32 & R-10 gas refilling — leak check aur pressure testing included.",
      },
      {
        icon: Sparkles,
        iconBg: "bg-purple-50",
        iconColor: "text-purple-600",
        title: "AC Deep Cleaning",
        description:
          "Foam jet cleaning, coil wash, drain cleaning — 30% better cooling.",
      },
    ],
  },
];

const teamMembers = [
  { id: "tm1", photo: "/assets/generated/team-member1.dim_300x300.jpg" },
  { id: "tm2", photo: "/assets/generated/team-member2.dim_300x300.jpg" },
  { id: "tm3", photo: "/assets/generated/team-member3.dim_300x300.jpg" },
];

const stats = [
  { value: "500+", label: "Happy Customers" },
  { value: "10+", label: "Years Experience" },
  { value: "7 Days", label: "Service Available" },
  { value: "100%", label: "Certified Work" },
];

const whyUsPoints = [
  "Sabhi brands: Samsung, LG, Daikin, Voltas, Hitachi",
  "Certified technicians with 10+ years experience",
  "Genuine spare parts only",
  "Service available 7 days — 10am to 7pm",
];

type FormState = {
  name: string;
  phone: string;
  address: string;
  service: string;
};

export function HomePage({
  onNavigate: _onNavigate,
  incomingService,
  onClearIncomingService,
}: HomePageProps) {
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    address: "",
    service: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [clickedCard, setClickedCard] = useState<string | null>(null);
  const [geoStatus, setGeoStatus] = useState<GeoStatus>("idle");
  const [geoError, setGeoError] = useState<string | null>(null);

  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      setGeoError("Location nahin mili, please manually type karein");
      return;
    }
    setGeoStatus("loading");
    setGeoError(null);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const addr = await reverseGeocode(
            pos.coords.latitude,
            pos.coords.longitude,
          );
          setForm((prev) => ({ ...prev, address: addr }));
          setGeoStatus("success");
          setTimeout(() => setGeoStatus("idle"), 2500);
        } catch {
          setForm((prev) => ({
            ...prev,
            address: `${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)} (please verify)`,
          }));
          setGeoStatus("success");
          setTimeout(() => setGeoStatus("idle"), 2500);
        }
      },
      () => {
        setGeoStatus("error");
        setGeoError("Location nahin mili, please manually type karein");
        setTimeout(() => setGeoStatus("idle"), 3000);
      },
      { timeout: 8000 },
    );
  };
  const bookingRef = useRef<HTMLElement>(null);
  const clearServiceRef = useRef(onClearIncomingService);
  clearServiceRef.current = onClearIncomingService;

  // When navigating from another page with a pre-selected service, auto-fill and scroll
  useEffect(() => {
    if (incomingService && incomingService.trim() !== "") {
      setForm((prev) => ({ ...prev, service: incomingService }));
      setTimeout(() => {
        bookingRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 300);
      clearServiceRef.current?.();
    }
  }, [incomingService]);

  const serviceTitleMap: Record<string, string> = {
    "AC Installation": "AC Installation",
    "Uninstallation & Shifting": "Uninstallation & Shifting",
    "AC Repair": "AC Repair & Service",
    "AC Maintenance": "Annual Maintenance (AMC)",
    "Gas Refilling": "Gas Refilling",
    "AC Deep Cleaning": "AC Deep Cleaning",
  };

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

  const handleServiceClick = (title: string) => {
    playWindSound();
    setClickedCard(title);
    setTimeout(() => setClickedCard(null), 700);
    const mappedService = serviceTitleMap[title] || title;
    setForm((prev) => ({ ...prev, service: mappedService }));
    setTimeout(() => {
      bookingRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 350);
  };

  const handleChange =
    (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleServiceChange = (value: string) => {
    setForm((prev) => ({ ...prev, service: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.service) return;
    const addressPart = form.address ? ` Mera address: ${form.address}.` : "";
    const msg = encodeURIComponent(
      `Hi, I'm ${form.name}. I need help with: ${form.service}. My number is ${form.phone}.${addressPart}`,
    );
    window.open(`https://wa.me/919871984736?text=${msg}`, "_blank");
    setSubmitted(true);
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[560px] md:min-h-[620px]">
        <div className="flex flex-col md:flex-row min-h-[560px] md:min-h-[620px]">
          {/* Left: Blue panel */}
          <div
            className="relative z-10 flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-14 md:py-0 w-full md:w-[55%]"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.32 0.12 245) 0%, oklch(0.42 0.12 245) 60%, oklch(0.52 0.12 245) 100%)",
            }}
          >
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 bg-white/15 rounded-full px-3 py-1 text-sm text-white/90 mb-5 font-medium">
                <Zap className="w-3.5 h-3.5" />
                Delhi's #1 AC Service Provider
              </div>
              <div className="hero-float">
                <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-bold text-white leading-tight mb-4 hero-3d text-3d-light">
                  Expert AC Services
                  <span className="block text-white/80 text-3xl sm:text-4xl lg:text-[40px] font-semibold mt-1">
                    At Your Doorstep
                  </span>
                </h1>
              </div>
              <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-8 max-w-md">
                Installation, repair, and maintenance by certified technicians.
                Available 7 days a week across Delhi NCR.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="tel:+919871984736" data-ocid="hero.primary_button">
                  <Button
                    size="lg"
                    className="bg-white text-primary hover:bg-white/90 font-bold rounded-full px-8 py-6 text-lg w-full sm:w-auto btn-3d-hero"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Call Now
                  </Button>
                </a>
                <a
                  href="https://wa.me/919871984736"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="hero.secondary_button"
                >
                  <Button
                    size="lg"
                    className="font-bold rounded-full px-8 py-6 text-lg w-full sm:w-auto text-white hover:opacity-90 btn-3d-hero"
                    style={{ backgroundColor: "#25D366" }}
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    WhatsApp Us
                  </Button>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Technician photo */}
          <div
            className="hidden md:block md:w-[45%] relative"
            style={{
              background:
                "linear-gradient(to right, oklch(0.52 0.12 245) 0%, transparent 30%)",
            }}
          >
            <img
              src="/assets/generated/hero-technician.dim_600x500.png"
              alt="Wave AC technician at work"
              className="w-full h-full object-cover object-center"
              style={{ minHeight: "560px" }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, oklch(0.42 0.12 245) 0%, transparent 35%)",
              }}
            />
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-card border-b border-border navbar-3d">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(({ value, label }, idx) => (
              <div
                key={label}
                className={`text-center scroll-reveal-scale scroll-reveal-delay-${idx + 1}`}
              >
                <div className="text-2xl sm:text-3xl font-bold text-primary text-3d">
                  {value}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground font-medium mt-0.5">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Services Section — grouped by category */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 scroll-reveal">
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-primary bg-primary/8 px-4 py-1.5 rounded-full border border-primary/20 mb-3">
              All Services
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 text-3d">
              Our Expert AC Services
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
              Comprehensive air conditioning solutions — click any service to
              book instantly
            </p>
          </div>

          {/* Category Groups */}
          <div className="space-y-12">
            {serviceCategories.map(
              ({ label, icon: CatIcon, services }, catIdx) => (
                <div key={label}>
                  {/* Category Header */}
                  <div
                    className={`flex items-center gap-3 mb-6 ${catIdx % 2 === 0 ? "scroll-reveal-left" : "scroll-reveal-right"}`}
                  >
                    <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <CatIcon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-base font-bold text-foreground">
                      {label}
                    </h3>
                    <div className="h-px flex-grow bg-border" />
                  </div>

                  {/* Service Cards — top category gets stronger 3D */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 max-w-4xl mx-auto">
                    {services.map(
                      (
                        { icon: Icon, iconBg, iconColor, title, description },
                        svcIdx,
                      ) => (
                        <button
                          key={title}
                          type="button"
                          onClick={() => handleServiceClick(title)}
                          data-ocid={`home.service.${title.toLowerCase().replace(/[^a-z0-9]/g, "_")}`}
                          className={[
                            "w-full text-left bg-card rounded-xl border-2 p-5 transition-all duration-200 group cursor-pointer select-none relative overflow-hidden",
                            catIdx === 0 ? "card-3d-top" : "card-3d",
                            `scroll-reveal scroll-reveal-delay-${svcIdx + 1}`,
                            clickedCard === title
                              ? "border-primary scale-[1.03]"
                              : "border-border hover:border-primary/50",
                          ].join(" ")}
                        >
                          {/* Wind burst for clicked */}
                          {clickedCard === title && (
                            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl z-10">
                              <div
                                className="wind-streak"
                                style={{ top: "30%", animationDelay: "0ms" }}
                              />
                              <div
                                className="wind-streak-wide"
                                style={{ top: "50%", animationDelay: "80ms" }}
                              />
                              <div
                                className="wind-streak"
                                style={{ top: "70%", animationDelay: "160ms" }}
                              />
                            </div>
                          )}

                          <div className="flex items-start gap-4">
                            <div
                              className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200 ${iconBg} group-hover:scale-110`}
                            >
                              <Icon className={`w-6 h-6 ${iconColor}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-base text-foreground mb-1 leading-tight">
                                {title}
                              </h4>
                              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                                {description}
                              </p>
                              <div className="mt-2.5 flex items-center gap-1 text-xs font-semibold text-primary">
                                <Wind className="w-3.5 h-3.5" />
                                <span>Book Now →</span>
                              </div>
                            </div>
                          </div>
                        </button>
                      ),
                    )}
                  </div>
                </div>
              ),
            )}
          </div>

          {/* Why Choose Us brief */}
          <div className="mt-14 bg-card border border-border rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto card-3d-sm scroll-reveal">
            <h3 className="font-bold text-base sm:text-lg text-foreground mb-4 text-center text-3d">
              Kyun Chunein Wave AC Services?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {whyUsPoints.map((point) => (
                <div key={point} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hamari Team subsection */}
          <div className="mt-14">
            <div className="flex items-center gap-4 mb-8 scroll-reveal">
              <div className="h-px flex-grow bg-border" />
              <span className="text-sm font-bold text-primary bg-primary/8 border border-primary/20 rounded-full px-4 py-1.5 whitespace-nowrap flex items-center gap-2">
                <Users className="w-4 h-4" />
                Hamari Team — Wave AC Uniform Mein
              </span>
              <div className="h-px flex-grow bg-border" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {teamMembers.map(({ id, photo }, idx) => (
                <div
                  key={id}
                  data-ocid={`team.item.${idx + 1}`}
                  className={`bg-card rounded-xl p-6 text-center border border-border scroll-reveal scroll-reveal-delay-${idx + 1}`}
                >
                  <img
                    src={photo}
                    alt="Wave AC Team Member"
                    className="w-36 h-36 rounded-full object-cover mx-auto mb-3 border-4 border-primary/20 shadow-sm"
                  />
                  <span className="inline-block text-xs text-primary bg-primary/10 border border-primary/20 rounded-full px-3 py-1">
                    Wave Air Conditioning Service
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AC Diagram Section */}
      <section id="ac-diagram" className="py-16 sm:py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 scroll-reveal-scale">
          <div className="ac-3d-wrapper">
            <ACDiagram />
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 sm:py-20 bg-muted/30 border-y border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 scroll-reveal">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3 text-3d">
              🎬 Hamara Kaam Dekhein
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto">
              Wave AC Services ki real service dekhein — professional
              technicians, quality work, aur satisfied customers.
            </p>
          </div>
          <div
            className="scroll-reveal rounded-2xl overflow-hidden shadow-xl border border-border"
            style={{ position: "relative", paddingTop: "56.25%" }}
          >
            <iframe
              src="https://www.youtube.com/embed/EU-4_HeVw_I?autoplay=1&loop=1&playlist=EU-4_HeVw_I&mute=1&controls=1&rel=0&modestbranding=1"
              title="Wave AC Services — Hamara Kaam"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: "none",
              }}
            />
          </div>
        </div>
      </section>

      {/* Quick Booking Section */}
      <section
        ref={bookingRef}
        className="py-20 sm:py-28 bg-card border-y border-border"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground mb-4 text-3d">
              📋 Book a Service
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto">
              Fill in your details and we'll confirm via WhatsApp. Service
              available any day within 7 days — 10 AM to 7 PM.
            </p>
          </div>

          {submitted ? (
            <div className="flex flex-col items-center justify-center p-16 rounded-3xl border border-green-200 bg-green-50 text-center scroll-reveal-scale">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                style={{ backgroundColor: "#25D366" }}
              >
                <Send className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                Booking Request Sent!
              </h3>
              <p className="text-muted-foreground text-base max-w-sm">
                Your request has been sent via WhatsApp. Mohammad Dilshad will
                contact you shortly.
              </p>
              <Button
                onClick={() => setSubmitted(false)}
                className="mt-8 font-bold rounded-full px-10 py-6 text-lg text-white hover:opacity-90 shadow-sm"
                style={{ backgroundColor: "#25D366" }}
              >
                Book Another Service
              </Button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-8 bg-background rounded-3xl border border-border p-10 sm:p-12 form-3d scroll-reveal"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                <div className="space-y-2">
                  <Label htmlFor="hname" className="text-base font-semibold">
                    Full Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="hname"
                    value={form.name}
                    onChange={handleChange("name")}
                    placeholder="Your full name"
                    required
                    className="h-14 text-lg border-border focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hphone" className="text-base font-semibold">
                    Phone Number <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="hphone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange("phone")}
                    placeholder="+91-XXXXXXXXXX"
                    required
                    className="h-14 text-lg border-border focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="haddress"
                    className="text-base font-semibold flex items-center gap-2"
                  >
                    <MapPin className="w-4 h-4 text-primary" />
                    Aapka Address <span className="text-destructive">*</span>
                  </Label>
                  <button
                    type="button"
                    onClick={handleUseLocation}
                    disabled={geoStatus === "loading"}
                    data-ocid="home.use_location_btn"
                    className={[
                      "inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full border transition-all duration-200 disabled:opacity-60",
                      geoStatus === "success"
                        ? "bg-green-100 text-green-700 border-green-300"
                        : geoStatus === "error"
                          ? "bg-red-100 text-red-600 border-red-300"
                          : "bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100",
                    ].join(" ")}
                  >
                    {geoStatus === "loading" ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <LocateFixed className="w-4 h-4" />
                    )}
                    {geoStatus === "loading"
                      ? "Dhundh raha hai..."
                      : geoStatus === "success"
                        ? "✓ Mila!"
                        : "📍 Location Use Karein"}
                  </button>
                </div>
                <Input
                  id="haddress"
                  value={form.address}
                  onChange={handleChange("address")}
                  placeholder="Ghar ka address likhein (mohalla, area, Delhi)"
                  required
                  className="h-14 text-lg border-border focus:border-primary"
                  data-ocid="home.address_input"
                />
                {geoError && geoStatus === "error" && (
                  <p className="text-sm text-red-500 mt-1">{geoError}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="hservice" className="text-base font-semibold">
                  Service Type <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={form.service}
                  onValueChange={handleServiceChange}
                  required
                >
                  <SelectTrigger
                    id="hservice"
                    className="h-14 text-lg border-border"
                  >
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AC Installation">
                      AC Installation
                    </SelectItem>
                    <SelectItem value="AC Repair & Service">
                      AC Repair & Service
                    </SelectItem>
                    <SelectItem value="Annual Maintenance (AMC)">
                      Annual Maintenance (AMC)
                    </SelectItem>
                    <SelectItem value="Gas Refilling">Gas Refilling</SelectItem>
                    <SelectItem value="AC Deep Cleaning">
                      AC Deep Cleaning
                    </SelectItem>
                    <SelectItem value="Uninstallation & Shifting">
                      Uninstallation & Shifting
                    </SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                className="w-full font-bold text-xl py-8 rounded-full text-white hover:opacity-90 shadow-md"
                style={{ backgroundColor: "#25D366" }}
                data-ocid="home.booking_submit"
              >
                <MessageCircle className="w-7 h-7 mr-3" />
                Book via WhatsApp
              </Button>

              <p className="text-sm text-center text-muted-foreground">
                You'll be redirected to WhatsApp to confirm with Mohammad
                Dilshad.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-16 sm:py-20"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.32 0.12 245) 0%, oklch(0.45 0.12 245) 100%)",
        }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center scroll-reveal-scale">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-6">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 text-3d-light">
            Need AC Help?
          </h2>
          <p className="text-white/80 mb-8 text-base sm:text-lg">
            Call Mohammad Dilshad for fast, reliable AC service anywhere in
            Delhi NCR. Available 7 days a week.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+919871984736" data-ocid="cta.primary_button">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 font-bold rounded-full px-10 py-6 text-lg w-full sm:w-auto shadow-sm"
              >
                <Phone className="w-6 h-6 mr-2" />
                +91-9871984736
              </Button>
            </a>
            <a
              href="https://wa.me/919871984736"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="cta.secondary_button"
            >
              <Button
                size="lg"
                className="font-bold rounded-full px-10 py-6 text-lg w-full sm:w-auto text-white hover:opacity-90 shadow-sm"
                style={{ backgroundColor: "#25D366" }}
              >
                <MessageCircle className="w-6 h-6 mr-2" />
                WhatsApp Us
              </Button>
            </a>
          </div>
          <p className="mt-4 text-white/60 text-sm">
            <Clock className="w-4 h-4 inline mr-1" />
            Service Hours: 10 AM – 7 PM, 7 Days a Week
          </p>
        </div>
      </section>
    </main>
  );
}
