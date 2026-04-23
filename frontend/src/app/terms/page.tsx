import { getPageContent } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Qodix',
  description: 'Terms and conditions for using Qodix services.',
};

export default async function TermsOfService() {
  const pageContent = await getPageContent('terms-of-service');

  return (
    <main className="bg-white text-black min-h-screen">
      <div className="bg-black">
        <Navbar logoText="Qodix" />
      </div>
      
      <article className="pt-32 pb-24 container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-12">Terms of Service</h1>
        
        {pageContent ? (
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: pageContent.content }}
          />
        ) : (
          <div className="prose prose-lg max-w-none text-black/70 space-y-6">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            <p>Welcome to Qodix! These terms and conditions outline the rules and regulations for the use of Qodix's Website.</p>
            <h3>1. Terms</h3>
            <p>By accessing this website we assume you accept these terms and conditions. Do not continue to use Qodix if you do not agree to take all of the terms and conditions stated on this page.</p>
            <h3>2. License</h3>
            <p>Unless otherwise stated, Qodix and/or its licensors own the intellectual property rights for all material on Qodix. All intellectual property rights are reserved.</p>
            <h3>3. User Comments</h3>
            <p>Parts of this website may offer an opportunity for users to post and exchange opinions and information. Qodix does not filter, edit, publish or review Comments prior to their presence on the website.</p>
          </div>
        )}
      </article>

      <Footer logoText="Qodix" tagline="Ready to Tech It Easy? Let's talk." socials={[]} />
    </main>
  );
}
