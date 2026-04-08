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
import { CheckCircle, Quote, Send, Star } from "lucide-react";
import { useState } from "react";

const testimonials = [
  {
    name: "Rahul Sharma",
    location: "Lajpat Nagar",
    rating: 5,
    text: "Excellent service! My AC was not cooling for 2 days. Called Wave AC in the morning and their technician arrived within 2 hours. Diagnosed the gas leak quickly, refilled the gas, and now it works perfectly. Very professional team.",
    service: "Gas Refilling",
  },
  {
    name: "Priya Agarwal",
    location: "Dwarka Sector 12",
    rating: 5,
    text: "Got 2 new ACs installed for my apartment. Mohammad Dilshad's team was on time, did a clean installation, and explained everything. Pricing was very transparent — no hidden charges. Highly recommend!",
    service: "AC Installation",
  },
  {
    name: "Amit Verma",
    location: "Rohini Sector 7",
    rating: 5,
    text: "Signed up for their AMC and it's been the best decision. They service my 3 ACs twice a year, and whenever there's a minor issue, they come the same day. Customer service is outstanding. Worth every rupee.",
    service: "Annual Maintenance",
  },
  {
    name: "Sunita Mehta",
    location: "Janakpuri",
    rating: 5,
    text: "Had a strange noise from my bedroom AC for weeks. The technician found a loose fan blade and fixed it in 30 minutes. Also did a deep cleaning. The AC is now quieter and colder than ever. Great work!",
    service: "AC Repair",
  },
  {
    name: "Vikram Singh",
    location: "Pitampura",
    rating: 5,
    text: "We were shifting our office and needed 5 ACs to be uninstalled and reinstalled at the new location. Wave AC handled everything smoothly. No damage, quick turnaround. Professional and reliable.",
    service: "AC Shifting",
  },
  {
    name: "Kavitha Nair",
    location: "Greater Kailash",
    rating: 5,
    text: "Best AC service in Delhi NCR! Called them for deep cleaning my split AC. The difference is incredible — better cooling, no musty smell, and the apartment stays cooler longer. Very satisfied with the service.",
    service: "Deep Cleaning",
  },
];

const STAR_KEYS = ["s1", "s2", "s3", "s4", "s5"];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {STAR_KEYS.map((key, i) => (
        <Star
          key={key}
          className={`w-4 h-4 ${
            i < rating ? "text-amber-400 fill-amber-400" : "text-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

const SERVICE_OPTIONS = [
  "AC Installation",
  "AC Repair & Service",
  "Annual Maintenance",
  "Gas Refilling",
  "AC Deep Cleaning",
  "Uninstallation & Shifting",
];

function InteractiveStarRating({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const [hovered, setHovered] = useState(0);

  return (
    <fieldset className="flex gap-1 border-0 p-0 m-0">
      <legend className="sr-only">Star rating</legend>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          aria-label={`${star} star${star > 1 ? "s" : ""}`}
          data-ocid={`review.rating.${star}`}
          className="p-0.5 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 transition-transform duration-100 hover:scale-110 active:scale-95"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
        >
          <Star
            className={`w-8 h-8 transition-colors duration-100 ${
              star <= (hovered || value)
                ? "text-amber-400 fill-amber-400"
                : "text-gray-300 fill-transparent"
            }`}
          />
        </button>
      ))}
    </fieldset>
  );
}

function ReviewForm() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [service, setService] = useState("");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Naam zaroori hai";
    if (!location.trim()) errs.location = "Location zaroori hai";
    if (!service) errs.service = "Service select karein";
    if (rating < 1) errs.rating = "Kam se kam 1 star dijiye";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});

    const ratingStr = `${rating}/5 stars`;
    const reviewText = review.trim()
      ? review.trim()
      : "(No additional comments)";
    const message = `Hi, I'd like to leave a review for Wave AC Services! Name: ${name.trim()}, Location: ${location.trim()}, Service: ${service}, Rating: ${ratingStr}. Review: ${reviewText}`;
    const whatsappUrl = `https://wa.me/919871984736?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        data-ocid="review.success_state"
        className="flex flex-col items-center justify-center py-12 gap-4 text-center"
      >
        <CheckCircle className="w-16 h-16 text-green-500" />
        <h3 className="text-xl font-bold text-foreground">Shukriya! 🙏</h3>
        <p className="text-muted-foreground text-sm max-w-xs">
          Aapka review humein WhatsApp par mil gaya. Bahut bahut dhanyawaad for
          sharing your experience with Wave AC Services!
        </p>
        <Button
          variant="outline"
          className="mt-2 border-primary text-primary hover:bg-brand-pale"
          onClick={() => {
            setSubmitted(false);
            setName("");
            setLocation("");
            setService("");
            setRating(0);
            setReview("");
          }}
          data-ocid="review.secondary_button"
        >
          Aur Ek Review Dein
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Name + Location */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label
            htmlFor="review-name"
            className="text-sm font-medium text-foreground"
          >
            Aapka Naam <span className="text-red-500">*</span>
          </Label>
          <Input
            id="review-name"
            data-ocid="review.input"
            placeholder="Jaise: Rajesh Kumar"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`text-base ${errors.name ? "border-red-400 focus-visible:ring-red-400" : ""}`}
            autoComplete="name"
          />
          {errors.name && (
            <p data-ocid="review.error_state" className="text-xs text-red-500">
              {errors.name}
            </p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label
            htmlFor="review-location"
            className="text-sm font-medium text-foreground"
          >
            Location <span className="text-red-500">*</span>
          </Label>
          <Input
            id="review-location"
            data-ocid="review.search_input"
            placeholder="Jaise: Lajpat Nagar, Delhi"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={`text-base ${errors.location ? "border-red-400 focus-visible:ring-red-400" : ""}`}
            autoComplete="address-level2"
          />
          {errors.location && (
            <p className="text-xs text-red-500">{errors.location}</p>
          )}
        </div>
      </div>

      {/* Service */}
      <div className="space-y-1.5">
        <Label
          htmlFor="review-service"
          className="text-sm font-medium text-foreground"
        >
          Service <span className="text-red-500">*</span>
        </Label>
        <Select value={service} onValueChange={setService}>
          <SelectTrigger
            id="review-service"
            data-ocid="review.select"
            className={`text-base ${errors.service ? "border-red-400 focus-visible:ring-red-400" : ""}`}
          >
            <SelectValue placeholder="Kaun si service li?" />
          </SelectTrigger>
          <SelectContent>
            {SERVICE_OPTIONS.map((opt) => (
              <SelectItem key={opt} value={opt}>
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.service && (
          <p className="text-xs text-red-500">{errors.service}</p>
        )}
      </div>

      {/* Star Rating */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-foreground">
          Rating <span className="text-red-500">*</span>
        </Label>
        <div className="flex items-center gap-3">
          <InteractiveStarRating value={rating} onChange={setRating} />
          {rating > 0 && (
            <span className="text-sm text-amber-600 font-medium">
              {["Poor", "Fair", "Good", "Very Good", "Excellent"][rating - 1]}
            </span>
          )}
        </div>
        {errors.rating && (
          <p className="text-xs text-red-500">{errors.rating}</p>
        )}
      </div>

      {/* Review Text */}
      <div className="space-y-1.5">
        <Label
          htmlFor="review-text"
          className="text-sm font-medium text-foreground"
        >
          Aapka Review{" "}
          <span className="text-muted-foreground font-normal">(Optional)</span>
        </Label>
        <Textarea
          id="review-text"
          data-ocid="review.textarea"
          placeholder="Apna experience share karein — kya pasand aaya, kya improve ho sakta hai..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
          rows={4}
          className="text-base resize-none"
        />
      </div>

      {/* Submit */}
      <Button
        type="submit"
        data-ocid="review.submit_button"
        className="w-full sm:w-auto gap-2 text-white font-semibold px-8 py-3 text-base"
        style={{ background: "#25D366" }}
        size="lg"
      >
        <Send className="w-4 h-4" />
        WhatsApp par Review Bhejein
      </Button>
      <p className="text-xs text-muted-foreground">
        Review submit karne par WhatsApp khulega aur aapka message already
        filled hoga.
      </p>
    </form>
  );
}

export function TestimonialsPage() {
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
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            Customer Reviews
          </h1>
          <p className="text-white/80 text-base sm:text-lg">
            What our Delhi customers say about Wave AC Services
          </p>
          <div className="mt-6 flex items-center justify-center gap-2">
            <div className="flex gap-1">
              {STAR_KEYS.map((key) => (
                <Star
                  key={key}
                  className="w-5 h-5 text-amber-400 fill-amber-400"
                />
              ))}
            </div>
            <span className="text-white font-semibold">4.9/5</span>
            <span className="text-white/70 text-sm">from 200+ reviews</span>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map(
              ({ name, location, rating, text, service }, idx) => (
                <div
                  key={name}
                  data-ocid={`testimonials.item.${idx + 1}`}
                  className={`bg-white rounded-2xl border border-border shadow-card p-6 flex flex-col hover:shadow-md transition-shadow duration-200 scroll-reveal scroll-reveal-delay-${Math.min(idx + 1, 5)}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="w-11 h-11 rounded-full bg-brand-pale flex items-center justify-center mb-2">
                        <span className="text-primary font-bold text-base">
                          {name.charAt(0)}
                        </span>
                      </div>
                      <h3 className="font-bold text-sm text-foreground">
                        {name}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {location}, Delhi
                      </p>
                    </div>
                    <Quote className="w-8 h-8 text-brand-light opacity-40 flex-shrink-0" />
                  </div>
                  <StarRating rating={rating} />
                  <p className="text-sm text-muted-foreground leading-relaxed mt-3 flex-grow">
                    &ldquo;{text}&rdquo;
                  </p>
                  <div className="mt-4 pt-4 border-t border-border">
                    <span className="inline-flex items-center text-xs font-medium bg-brand-pale text-primary rounded-full px-3 py-1">
                      {service}
                    </span>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Trust banner */}
      <section className="bg-brand-pale py-12 border-t border-border">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
            Join 500+ Satisfied Customers
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base mb-2">
            Experience the Wave AC difference — reliable, professional, and
            affordable.
          </p>
        </div>
      </section>

      {/* Leave Your Review Form */}
      <section
        className="py-16 sm:py-20 bg-white border-t border-border"
        data-ocid="review.section"
      >
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          {/* Section header */}
          <div className="text-center mb-10 scroll-reveal">
            <div className="inline-flex items-center gap-2 bg-brand-pale text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-4">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              Apni Raay Dein
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Apna Review Dijiye
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              Aapka anubhav doosron ki madad karta hai. Please apna review share
              karein!
            </p>
          </div>

          {/* Form card */}
          <div
            data-ocid="review.card"
            className="bg-white rounded-2xl border border-border shadow-card p-6 sm:p-8 scroll-reveal-scale"
          >
            <ReviewForm />
          </div>
        </div>
      </section>
    </main>
  );
}
