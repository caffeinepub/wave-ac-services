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
  ArrowUpDown,
  Clock,
  Droplets,
  MessageCircle,
  Phone,
  Send,
  Shield,
  Thermometer,
  Users,
  Wind,
  Wrench,
  Zap,
} from "lucide-react";
import { useRef, useState } from "react";

type Page = "home" | "services" | "why-us" | "testimonials" | "contact";

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

const serviceCategories = [
  {
    label: "Installation Services",
    services: [
      {
        icon: Wind,
        title: "AC Installation",
        description:
          "Professional installation of all AC brands including split, window, and cassette units.",
      },
      {
        icon: ArrowUpDown,
        title: "Uninstallation & Shifting",
        description:
          "Safe removal and reinstallation of AC units when you're moving home or office.",
      },
    ],
  },
  {
    label: "Repair & Maintenance",
    services: [
      {
        icon: Wrench,
        title: "AC Repair",
        description:
          "Fast diagnosis and repair of all AC issues — cooling problems, noise, leaks, and more.",
      },
      {
        icon: Shield,
        title: "AC Maintenance",
        description:
          "Regular servicing and AMC contracts to keep your AC running at peak efficiency.",
      },
    ],
  },
  {
    label: "Cleaning & Gas",
    services: [
      {
        icon: Thermometer,
        title: "Gas Refilling",
        description:
          "Certified gas refilling with genuine refrigerant for optimal cooling performance.",
      },
      {
        icon: Droplets,
        title: "AC Deep Cleaning",
        description:
          "Complete foam jet cleaning, coil washing, drain pipe cleaning, and sanitization.",
      },
    ],
  },
];

const teamMembers = [
  {
    name: "Rahul Kumar",
    role: "AC Technician",
    photo: "/assets/generated/team-member1.dim_300x300.jpg",
  },
  {
    name: "Suresh Verma",
    role: "AC Technician",
    photo: "/assets/generated/team-member2.dim_300x300.jpg",
  },
  {
    name: "Amit Singh",
    role: "AC Technician",
    photo: "/assets/generated/team-member3.dim_300x300.jpg",
  },
];

const stats = [
  { value: "500+", label: "Happy Customers" },
  { value: "10+", label: "Years Experience" },
  { value: "7 Days", label: "Service Available" },
  { value: "100%", label: "Certified Work" },
];

type FormState = {
  name: string;
  phone: string;
  service: string;
};

export function HomePage({ onNavigate: _onNavigate }: HomePageProps) {
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    service: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [clickedCard, setClickedCard] = useState<string | null>(null);
  const bookingRef = useRef<HTMLElement>(null);

  // Service title to form value mapping
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

      // White noise buffer
      const buffer = ctx.createBuffer(1, bufferSize, sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const source = ctx.createBufferSource();
      source.buffer = buffer;

      // Bandpass filter — higher frequency for sharper wind
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = 1200;
      filter.Q.value = 1.2;

      // Gain envelope: fast ramp up, loud peak, quick fade
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
      // Silently ignore if Web Audio API not supported
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
    const msg = encodeURIComponent(
      `Hi, I'm ${form.name}. I need help with: ${form.service}. My number is ${form.phone}.`,
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
              <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-bold text-white leading-tight mb-4">
                Expert AC Services
                <span className="block text-white/80 text-3xl sm:text-4xl lg:text-[40px] font-semibold mt-1">
                  At Your Doorstep
                </span>
              </h1>
              <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-8 max-w-md">
                Installation, repair, and maintenance by certified technicians.
                Available 7 days a week across Delhi NCR.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="tel:+919871984736" data-ocid="hero.primary_button">
                  <Button
                    size="lg"
                    className="bg-white text-primary hover:bg-white/90 font-bold rounded-full px-8 py-6 text-lg shadow-md w-full sm:w-auto"
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
                    className="font-bold rounded-full px-8 py-6 text-lg w-full sm:w-auto text-white hover:opacity-90"
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
      <section className="bg-brand-pale border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary">
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
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-primary bg-primary/8 px-4 py-1.5 rounded-full border border-primary/20 mb-3">
              All Services
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
              Our Expert AC Services
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
              Comprehensive air conditioning solutions for homes and offices
              across Delhi NCR
            </p>
          </div>

          {/* Category Groups */}
          <div className="space-y-12">
            {serviceCategories.map(({ label, services }) => (
              <div key={label}>
                {/* Category Divider */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px flex-grow bg-border" />
                  <span className="text-sm font-bold text-primary bg-primary/8 border border-primary/20 rounded-full px-4 py-1.5 whitespace-nowrap">
                    {label}
                  </span>
                  <div className="h-px flex-grow bg-border" />
                </div>

                {/* Services in this category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  {services.map(({ icon: Icon, title, description }) => (
                    <button
                      key={title}
                      type="button"
                      onClick={() => handleServiceClick(title)}
                      className={`w-full text-left bg-white rounded-xl border border-border shadow-card p-6 hover:shadow-md hover:border-brand-mid transition-all duration-200 group cursor-pointer select-none
                        ${clickedCard === title ? "scale-105 shadow-xl border-primary animate-pulse" : "hover:scale-[1.02]"}`}
                    >
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors duration-200
                        ${clickedCard === title ? "bg-primary" : "bg-brand-pale group-hover:bg-primary"}`}
                      >
                        <Icon
                          className={`w-6 h-6 transition-colors duration-200
                          ${clickedCard === title ? "text-white" : "text-primary group-hover:text-white"}`}
                        />
                        {clickedCard === title && (
                          <span className="absolute text-2xl animate-bounce ml-8 -mt-8 pointer-events-none select-none">
                            💨
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-base text-foreground mb-2">
                        {title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {description}
                      </p>
                      <div className="mt-3 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1">
                        <Wind className="w-3 h-3" /> Book This Service
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Hamari Team subsection */}
          <div className="mt-16">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-grow bg-border" />
              <span className="text-sm font-bold text-primary bg-primary/8 border border-primary/20 rounded-full px-4 py-1.5 whitespace-nowrap flex items-center gap-2">
                <Users className="w-4 h-4" />
                Hamari Team — Wave AC Uniform Mein
              </span>
              <div className="h-px flex-grow bg-border" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {teamMembers.map(({ name, role, photo }, idx) => (
                <div
                  key={name}
                  data-ocid={`team.item.${idx + 1}`}
                  className="bg-brand-pale rounded-xl p-6 text-center hover:shadow-md transition-all duration-200"
                >
                  <img
                    src={photo}
                    alt={name}
                    className="w-24 h-24 rounded-full object-cover mx-auto mb-3 border-4 border-white shadow-sm"
                  />
                  <h3 className="font-bold text-base text-foreground mb-0.5">
                    {name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">{role}</p>
                  <span className="inline-block text-xs text-primary bg-primary/10 border border-primary/20 rounded-full px-2 py-0.5">
                    Wave AC Uniform
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Booking Section */}
      <section ref={bookingRef} className="py-16 sm:py-20 bg-brand-pale">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
              Book a Service
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              Fill in your details and we'll confirm via WhatsApp. Service
              available any day within 7 days.
            </p>
          </div>

          {submitted ? (
            <div className="flex flex-col items-center justify-center p-12 rounded-2xl border border-green-200 bg-green-50 text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: "#25D366" }}
              >
                <Send className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                Booking Request Sent!
              </h3>
              <p className="text-muted-foreground text-sm max-w-xs">
                Your request has been sent via WhatsApp. Mohammad Dilshad will
                contact you shortly.
              </p>
              <Button
                onClick={() => setSubmitted(false)}
                className="mt-6 font-bold rounded-full px-8 py-5 text-base text-white hover:opacity-90"
                style={{ backgroundColor: "#25D366" }}
              >
                Book Another Service
              </Button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-5 bg-white rounded-2xl border border-border shadow-card p-7"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <Label htmlFor="hname" className="text-sm font-semibold">
                    Full Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="hname"
                    value={form.name}
                    onChange={handleChange("name")}
                    placeholder="Your full name"
                    required
                    className="border-border focus:border-primary"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="hphone" className="text-sm font-semibold">
                    Phone Number <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="hphone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange("phone")}
                    placeholder="+91-XXXXXXXXXX"
                    required
                    className="border-border focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="hservice" className="text-sm font-semibold">
                  Service Type <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={form.service}
                  onValueChange={handleServiceChange}
                  required
                >
                  <SelectTrigger id="hservice" className="border-border">
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
                className="w-full font-bold text-base py-6 rounded-full text-white hover:opacity-90"
                style={{ backgroundColor: "#25D366" }}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Book via WhatsApp
              </Button>

              <p className="text-xs text-center text-muted-foreground">
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
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-6">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
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
                className="bg-white text-primary hover:bg-white/90 font-bold rounded-full px-10 py-6 text-lg w-full sm:w-auto"
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
                className="font-bold rounded-full px-10 py-6 text-lg w-full sm:w-auto text-white hover:opacity-90"
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
