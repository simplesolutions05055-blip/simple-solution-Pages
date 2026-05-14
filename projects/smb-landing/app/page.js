import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import SocialProof from '@/components/SocialProof';
import FAQ from '@/components/FAQ';
import LeadForm from '@/components/LeadForm';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <SocialProof />
        <FAQ />
        <LeadForm />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
