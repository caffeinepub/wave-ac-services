import { Button } from "@/components/ui/button";
import {
  Award,
  BadgeCheck,
  Banknote,
  Calendar,
  Clock,
  Package,
  Phone,
  Wind,
} from "lucide-react";

type Page = "home" | "services" | "why-us" | "testimonials" | "contact";

interface WhyUsPageProps {
  onNavigate: (page: Page) => void;
}

const trustPoints = [
  {
    icon: Award,
    title: "10+ Years Experience",
    description:
      "Over a decade of serving Delhi NCR customers with expert AC installations, repairs, and maintenance. Thousands of satisfied clients.",
  },
  {
    icon: BadgeCheck,
    title: "Certified Technicians",
    description:
      "All our technicians are factory-trained and certified. We undergo regular training to stay updated with the latest AC technologies.",
  },
  {
    icon: Calendar,
    title: "Available 7 Days a Week",
    description:
      "We are available every day of the week — Monday to Sunday. Book anytime from 10 AM to 7 PM. No need to wait for weekdays.",
  },
  {
    icon: Banknote,
    title: "Affordable Prices",
    description:
      "Transparent, competitive pricing with no hidden charges. We provide detailed quotes before starting any work. Fair pricing guaranteed.",
  },
  {
    icon: Package,
    title: "Genuine Spare Parts",
    description:
      "We only use genuine, brand-approved spare parts sourced directly from authorized distributors. No local or substandard substitutes.",
  },
  {
    icon: BadgeCheck,
    title: "Trusted by Thousands",
    description:
      "500+ happy customers across Delhi NCR trust Wave AC Services for all their air conditioning needs. Quality service every time.",
  },
];

export function WhyUsPage({ onNavigate }: WhyUsPageProps) {
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
            Why Choose Wave AC?
          </h1>
          <p className="text-white/80 text-base sm:text-lg">
            Delhi's most trusted air conditioning service provider for over a
            decade
          </p>
        </div>
      </section>

      {/* Trust signals */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
              What Sets Us Apart
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
              We combine technical expertise with customer care to deliver the
              best AC service experience
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {trustPoints.map(({ icon: Icon, title, description }, idx) => (
              <div
                key={title}
                data-ocid={`whyus.item.${idx + 1}`}
                className="bg-white rounded-2xl border border-border shadow-card p-7 hover:shadow-md hover:border-brand-mid transition-all duration-200"
              >
                <div className="w-14 h-14 rounded-2xl bg-brand-pale flex items-center justify-center mb-5">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-bold text-lg text-foreground mb-2">
                  {title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About section */}
      <section className="py-16 sm:py-20 bg-brand-pale">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="w-full md:w-48 flex-shrink-0 flex justify-center">
              <div
                className="w-40 h-40 rounded-full flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.38 0.12 245) 0%, oklch(0.55 0.12 245) 100%)",
                }}
              >
                <Wind className="w-20 h-20 text-white/90" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                About Wave AC Services
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-4">
                Wave Air Conditioning Services was founded by Mohammad Dilshad
                in Delhi with a simple mission: provide world-class AC services
                at honest prices. Starting with a small team and a lot of
                passion, we've grown into one of Delhi's most recognized AC
                service brands.
              </p>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-4">
                Today, we serve hundreds of homes and offices across Delhi NCR —
                from Connaught Place to Dwarka, from Rohini to Lajpat Nagar. Our
                team of 15+ certified technicians handles everything from basic
                servicing to complex installations.
              </p>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">
                <Clock className="w-4 h-4 inline mr-1 text-primary" />
                We are available 7 days a week, from 10 AM to 7 PM.
              </p>
              <Button
                onClick={() => onNavigate("contact")}
                data-ocid="whyus.primary_button"
                className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 font-semibold"
              >
                <Phone className="w-4 h-4 mr-2" />
                Get in Touch
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
