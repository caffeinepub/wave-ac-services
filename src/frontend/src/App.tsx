import { useState } from "react";
import { FloatingWhatsApp } from "./components/FloatingWhatsApp";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { ContactPage } from "./pages/ContactPage";
import { HomePage } from "./pages/HomePage";
import { ServicesPage } from "./pages/ServicesPage";
import { TestimonialsPage } from "./pages/TestimonialsPage";
import { WhyUsPage } from "./pages/WhyUsPage";

type Page = "home" | "services" | "why-us" | "testimonials" | "contact";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [selectedService, setSelectedService] = useState<string>("");

  const handleNavigateToBooking = (service: string) => {
    setSelectedService(service);
    setCurrentPage("contact");
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={setCurrentPage} />;
      case "services":
        return (
          <ServicesPage
            onNavigate={setCurrentPage}
            onBookService={handleNavigateToBooking}
          />
        );
      case "why-us":
        return <WhyUsPage onNavigate={setCurrentPage} />;
      case "testimonials":
        return <TestimonialsPage />;
      case "contact":
        return (
          <ContactPage
            preSelectedService={selectedService}
            onClearService={() => setSelectedService("")}
          />
        );
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
      <div className="flex-grow">{renderPage()}</div>
      <Footer onNavigate={setCurrentPage} />
      <FloatingWhatsApp />
    </div>
  );
}
