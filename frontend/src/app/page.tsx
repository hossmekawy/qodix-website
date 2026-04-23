import { getHomepageData } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import Services from '@/components/Services';
import Stats from '@/components/Stats';
import FeaturedWork from '@/components/FeaturedWork';
import Testimonials from '@/components/Testimonials';
import BlogTeaser from '@/components/BlogTeaser';
import CTAStrip from '@/components/CTAStrip';
import Footer from '@/components/Footer';

export const revalidate = 60; // Revalidate every minute

export default async function Home() {
  const data = await getHomepageData();

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>Error loading site content. Make sure the backend is running.</p>
      </div>
    );
  }

  const { hero, settings, tech_stack, services, stats, projects, testimonials, blogs, socials } = data;

  return (
    <main className="bg-white text-black min-h-screen">
      <Navbar logoText={settings?.navbar_logo_text || "Qodix"} />
      
      {hero && (
        <Hero 
          headline={hero.headline}
          typewriterWords={hero.typewriter_words}
          button1Text={hero.button_1_text}
          button1Link={hero.button_1_link}
          button2Text={hero.button_2_text}
          button2Link={hero.button_2_link}
        />
      )}
      
      {tech_stack && tech_stack.length > 0 && (
        <Marquee techStack={tech_stack} />
      )}
      
      {services && services.length > 0 && (
        <Services services={services} />
      )}
      
      {stats && stats.length > 0 && (
        <Stats stats={stats} />
      )}
      
      {projects && projects.length > 0 && (
        <FeaturedWork projects={projects} />
      )}
      
      {testimonials && testimonials.length > 0 && (
        <Testimonials testimonials={testimonials} />
      )}
      
      {blogs && blogs.length > 0 && (
        <BlogTeaser blogs={blogs} />
      )}
      
      {settings && (
        <CTAStrip 
          text={settings.footer_tagline}
          buttonText={settings.cta_button_text}
          buttonLink={settings.cta_button_link}
        />
      )}
      
      <Footer 
        logoText={settings?.navbar_logo_text || "Qodix"}
        tagline={settings?.footer_tagline || "Ready to Tech It Easy? Let's talk."}
        socials={socials}
      />
    </main>
  );
}
