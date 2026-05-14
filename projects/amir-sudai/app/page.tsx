import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { Personas } from "@/components/sections/Personas";
import { Approach } from "@/components/sections/Approach";
import { Offer } from "@/components/sections/Offer";
import { Process } from "@/components/sections/Process";
import { NotForYou } from "@/components/sections/NotForYou";
import { LeadForm } from "@/components/sections/LeadForm";
import { Footer } from "@/components/sections/Footer";

export default function Page() {
  return (
    <main>
      <Hero />
      <Manifesto />
      <Personas />
      <Approach />
      <Offer />
      <Process />
      <NotForYou />
      <LeadForm />
      <Footer />
    </main>
  );
}
