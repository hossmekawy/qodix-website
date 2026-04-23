import { getPageContent } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Qodix',
  description: 'Our privacy policy and data handling practices.',
};

export default async function PrivacyPolicy() {
  // Try to fetch dynamic content, otherwise fallback to static
  const pageContent = await getPageContent('privacy-policy');

  return (
    <main className="bg-white text-black min-h-screen">
      <div className="bg-black">
        <Navbar logoText="Qodix" />
      </div>
      
      <article className="pt-32 pb-24 container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-12">Privacy Policy</h1>
        
        {pageContent ? (
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: pageContent.content }}
          />
        ) : (
          <div className="prose prose-lg max-w-none text-black/70 space-y-6">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            <p>At Qodix, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.</p>
            <h3>Information Collection</h3>
            <p>We may collect information about you in a variety of ways. The information we may collect on the Site includes personal data, such as your name, email address, and telephone number, that you voluntarily give to us when you choose to participate in various activities related to the Site (such as contact forms or job applications).</p>
            <h3>Use of Information</h3>
            <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. We may use information collected about you via the Site to respond to your inquiries, process your job applications, and improve our website.</p>
          </div>
        )}
      </article>

      <Footer logoText="Qodix" tagline="Ready to Tech It Easy? Let's talk." socials={[]} />
    </main>
  );
}
