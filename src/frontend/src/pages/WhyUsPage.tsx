import { Button } from "@/components/ui/button";
import {
  Award,
  BadgeCheck,
  Banknote,
  Calendar,
  Clock,
  Package,
  Phone,
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
      "Transparent, competitive pricing with no hidden charges. We provide detailed quotes before starting any work. Fair pricing for everyone.",
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

const teamMembers = [
  { id: "tm1", photo: "/assets/generated/team-member1.dim_300x300.jpg" },
  { id: "tm2", photo: "/assets/generated/team-member2.dim_300x300.jpg" },
  { id: "tm3", photo: "/assets/generated/team-member3.dim_300x300.jpg" },
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
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-3d-light">
            Why Choose Wave AC?
          </h1>
          <p className="text-white/80 text-base sm:text-lg">
            Delhi's most trusted air conditioning service provider for over a
            decade
          </p>
        </div>
      </section>

      {/* Trust signals */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 text-3d">
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
                className={[
                  "bg-card rounded-2xl border border-border p-7 card-3d",
                  idx % 2 === 0 ? "scroll-reveal-left" : "scroll-reveal-right",
                  `scroll-reveal-delay-${Math.min((idx % 3) + 1, 5)}`,
                ].join(" ")}
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
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
      <section className="py-16 sm:py-20 bg-secondary/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-10 items-center scroll-reveal-scale">
            <div className="w-full md:w-48 flex-shrink-0 flex flex-col items-center gap-3">
              <img
                src="https://i.ibb.co/tPhBCYKQ/tPhBCYKQ.jpg"
                alt="Mohammad Dilshad - Founder & Owner"
                className="w-40 h-40 rounded-full object-cover shadow-md border-4 border-white"
              />
              <div className="text-center">
                <p className="font-bold text-foreground text-base">
                  Mohammad Dilshad
                </p>
                <p className="text-muted-foreground text-sm">
                  Founder &amp; Owner
                </p>
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

      {/* Our Team section */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 text-3d">
            Hamari Team — Wave AC Uniform Mein
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base mb-10 max-w-xl mx-auto">
            Wave AC Services ke certified aur expert technicians, poore uniform
            mein tayaar
          </p>

          {/* Group photo */}
          <div className="flex justify-center mb-10">
            <div className="w-full max-w-[700px]">
              <img
                src="/assets/generated/team-uniform-logo.dim_800x400.jpg"
                alt="Wave AC Services Team in Uniform"
                className="w-full rounded-2xl shadow-md object-cover"
              />
              <p className="text-sm text-muted-foreground mt-3 text-center">
                Wave AC Services Team — Delhi NCR
              </p>
            </div>
          </div>

          {/* Individual team member cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {teamMembers.map(({ id, photo }, idx) => (
              <div
                key={id}
                data-ocid={`team.item.${idx + 1}`}
                className={`bg-secondary/30 rounded-xl p-6 text-center card-3d-sm scroll-reveal scroll-reveal-delay-${idx + 1}`}
              >
                <img
                  src={photo}
                  alt="Wave AC Team Member"
                  className="w-36 h-36 rounded-full object-cover mx-auto mb-4 border-4 border-white shadow-sm"
                />
                <span className="inline-block text-xs text-primary bg-primary/10 border border-primary/20 rounded-full px-3 py-1">
                  Wave Air Conditioning Service
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
