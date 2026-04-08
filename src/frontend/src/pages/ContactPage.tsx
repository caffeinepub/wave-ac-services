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
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle,
  ExternalLink,
  Loader2,
  LocateFixed,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { useEffect, useState } from "react";

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

type FormState = {
  name: string;
  phone: string;
  address: string;
  service: string;
  message: string;
};

interface ContactPageProps {
  preSelectedService?: string;
  onClearService?: () => void;
}

export function ContactPage({
  preSelectedService,
  onClearService,
}: ContactPageProps) {
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    address: "",
    service: preSelectedService ?? "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
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

  useEffect(() => {
    if (preSelectedService) {
      setForm((prev) => ({ ...prev, service: preSelectedService }));
      setTimeout(() => {
        document.getElementById("booking-form")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 150);
    }
  }, [preSelectedService]);

  const handleChange =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      `Hi, I'm ${form.name}. I need help with: ${form.service}.${form.message ? ` ${form.message}` : ""} My number is ${form.phone}.${addressPart}`,
    );
    window.open(`https://wa.me/919871984736?text=${msg}`, "_blank");
    setSubmitted(true);
    if (onClearService) onClearService();
  };

  const activeService = form.service || preSelectedService || "";
  const waServiceMsg = activeService
    ? `Namaste, mujhe ${activeService} ki service chahiye. Please contact me.`
    : "Namaste, mujhe AC service ki jaankari chahiye.";
  const waServiceUrl = `https://wa.me/919871984736?text=${encodeURIComponent(waServiceMsg)}`;

  return (
    <main>
      {/* Header */}
      <section
        className="py-14 sm:py-16 text-white"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.32 0.12 245) 0%, oklch(0.45 0.12 245) 100%)",
        }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-3d-light">
            Contact Us
          </h1>
          <p className="text-white/80 text-base sm:text-lg">
            Book a service or get a free quote. Available daily 10 AM – 7 PM.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Details */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-foreground mb-5 text-3d scroll-reveal">
                  Get In Touch
                </h2>
                <ul className="space-y-4">
                  <li className="scroll-reveal-left scroll-reveal-delay-1">
                    <a
                      href="tel:+919871984736"
                      data-ocid="contact.primary_button"
                      className="flex items-start gap-4 p-4 rounded-xl border border-border hover:border-primary/60 hover:bg-primary/5 transition-all duration-200 group card-3d-sm"
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors">
                        <Phone className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">
                          Call Us
                        </div>
                        <div className="font-bold text-lg text-foreground">
                          +91-9871984736
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Mohammad Dilshad
                        </div>
                      </div>
                    </a>
                  </li>
                  <li className="scroll-reveal-left scroll-reveal-delay-2">
                    <a
                      href={waServiceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-ocid="contact.secondary_button"
                      className="flex items-start gap-4 p-4 rounded-xl border border-border hover:border-green-400 hover:bg-green-50 transition-all duration-200 group card-3d-sm"
                    >
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors"
                        style={{ backgroundColor: "#e8faf0" }}
                      >
                        <MessageCircle
                          className="w-6 h-6"
                          style={{ color: "#25D366" }}
                        />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">
                          WhatsApp
                        </div>
                        <div className="font-bold text-lg text-foreground">
                          +91-9871984736
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Quick response on WhatsApp
                        </div>
                      </div>
                    </a>
                  </li>
                  <li className="flex items-start gap-4 p-4 rounded-xl border border-border card-3d-sm scroll-reveal-left scroll-reveal-delay-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">
                        Service Area
                      </div>
                      <div className="font-bold text-foreground">
                        Delhi NCR, India
                      </div>
                      <div className="text-xs text-muted-foreground">
                        All Delhi neighbourhoods covered
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Quick Call + WhatsApp big buttons */}
              <div className="flex flex-col gap-3 scroll-reveal-scale scroll-reveal-delay-2">
                <a href="tel:+919871984736" className="block">
                  <Button
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90 text-white rounded-full font-bold py-6 text-base btn-3d"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Call +91-9871984736
                  </Button>
                </a>
                <a
                  href={waServiceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button
                    size="lg"
                    className="w-full font-bold rounded-full py-6 text-base text-white hover:opacity-90 btn-3d"
                    style={{ backgroundColor: "#25D366" }}
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    WhatsApp +91-9871984736
                  </Button>
                </a>
              </div>

              {/* Map card */}
              <div
                className="rounded-xl border border-border overflow-hidden card-3d-sm scroll-reveal-scale scroll-reveal-delay-3"
                data-ocid="contact.panel"
              >
                <div
                  className="h-48 flex flex-col items-center justify-center text-white"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.38 0.12 245) 0%, oklch(0.55 0.12 245) 100%)",
                  }}
                >
                  <MapPin className="w-10 h-10 mb-2 opacity-80" />
                  <div className="font-semibold text-lg mb-3">
                    Delhi NCR Service Area
                  </div>
                  <a
                    href="https://maps.app.goo.gl/a4eee5jsRLvhX6nHA?g_st=aw"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-ocid="contact.link"
                    className="inline-flex items-center gap-1.5 bg-white/20 hover:bg-white/30 transition-colors text-white text-sm font-medium px-4 py-2 rounded-full border border-white/30"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    View on Google Maps
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3 scroll-reveal-right">
              <h2 className="text-xl font-bold text-foreground mb-5 text-3d">
                Book a Service
              </h2>

              {/* Highlight banner when service is pre-selected */}
              {preSelectedService && !submitted && (
                <div className="mb-4 flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/8 border border-primary/20">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse flex-shrink-0" />
                  <p className="text-sm font-semibold text-primary">
                    Booking for:{" "}
                    <span className="font-bold">{preSelectedService}</span>
                  </p>
                </div>
              )}

              {submitted ? (
                <div
                  data-ocid="contact.success_state"
                  className="flex flex-col items-center justify-center p-12 rounded-2xl border border-green-200 bg-green-50 text-center card-3d-sm"
                >
                  <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Request Sent!
                  </h3>
                  <p className="text-muted-foreground text-sm max-w-xs">
                    Your booking request has been sent via WhatsApp. Mohammad
                    Dilshad will contact you shortly.
                  </p>
                  <Button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 bg-primary hover:bg-primary/90 text-white rounded-full px-6 btn-3d"
                    data-ocid="contact.secondary_button"
                  >
                    Send Another Request
                  </Button>
                </div>
              ) : (
                <form
                  id="booking-form"
                  onSubmit={handleSubmit}
                  data-ocid="contact.modal"
                  className="space-y-5 bg-background rounded-2xl border border-border p-7 form-3d"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <Label htmlFor="name" className="text-sm font-semibold">
                        Full Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="name"
                        value={form.name}
                        onChange={handleChange("name")}
                        placeholder="Your full name"
                        required
                        data-ocid="contact.input"
                        className="border-border focus:border-primary"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="phone" className="text-sm font-semibold">
                        Phone Number <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange("phone")}
                        placeholder="+91-XXXXXXXXXX"
                        required
                        data-ocid="contact.input"
                        className="border-border focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="address"
                        className="text-sm font-semibold flex items-center gap-1.5"
                      >
                        <MapPin className="w-3.5 h-3.5 text-primary" />
                        Aapka Address{" "}
                        <span className="text-destructive">*</span>
                      </Label>
                      <button
                        type="button"
                        onClick={handleUseLocation}
                        disabled={geoStatus === "loading"}
                        data-ocid="contact.use_location_btn"
                        className={[
                          "inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border transition-all duration-200 disabled:opacity-60",
                          geoStatus === "success"
                            ? "bg-green-100 text-green-700 border-green-300"
                            : geoStatus === "error"
                              ? "bg-red-100 text-red-600 border-red-300"
                              : "bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100",
                        ].join(" ")}
                      >
                        {geoStatus === "loading" ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                          <LocateFixed className="w-3 h-3" />
                        )}
                        {geoStatus === "loading"
                          ? "Dhundh raha hai..."
                          : geoStatus === "success"
                            ? "✓ Mila!"
                            : "📍 Location Use Karein"}
                      </button>
                    </div>
                    <Input
                      id="address"
                      value={form.address}
                      onChange={handleChange("address")}
                      placeholder="Ghar ka address likhein (mohalla, area, Delhi)"
                      required
                      data-ocid="contact.address_input"
                      className="border-border focus:border-primary"
                    />
                    {geoError && geoStatus === "error" && (
                      <p className="text-xs text-red-500 mt-1">{geoError}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="service" className="text-sm font-semibold">
                      Service Type <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={form.service}
                      onValueChange={handleServiceChange}
                      required
                    >
                      <SelectTrigger
                        id="service"
                        data-ocid="contact.select"
                        className="border-border"
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
                        <SelectItem value="Gas Refilling">
                          Gas Refilling
                        </SelectItem>
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

                  <div className="space-y-1.5">
                    <Label htmlFor="message" className="text-sm font-semibold">
                      Message{" "}
                      <span className="text-muted-foreground font-normal">
                        (optional)
                      </span>
                    </Label>
                    <Textarea
                      id="message"
                      value={form.message}
                      onChange={handleChange("message")}
                      placeholder="Describe your AC problem or any additional details..."
                      rows={4}
                      data-ocid="contact.textarea"
                      className="border-border focus:border-primary resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    data-ocid="contact.submit_button"
                    size="lg"
                    className="w-full text-white rounded-full font-bold text-base py-6 hover:opacity-90 btn-3d"
                    style={{ backgroundColor: "#25D366" }}
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Send via WhatsApp
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    By submitting, you'll be directed to WhatsApp to confirm
                    your booking with Mohammad Dilshad.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
