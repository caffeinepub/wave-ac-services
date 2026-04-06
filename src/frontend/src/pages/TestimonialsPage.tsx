import { Quote, Star } from "lucide-react";

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
                  className="bg-white rounded-2xl border border-border shadow-card p-6 flex flex-col hover:shadow-md transition-shadow duration-200"
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
    </main>
  );
}
