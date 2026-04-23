import { getProject } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const project = await getProject(params.slug);
  if (!project) return { title: 'Not Found' };
  
  return {
    title: `${project.title} | Qodix Work`,
    description: `Read about how Qodix helped achieve ${project.result_metric} for ${project.title}.`,
    openGraph: {
      images: project.image ? [project.image] : [],
    }
  };
}

export default async function ProjectDetail(props: PageProps) {
  const params = await props.params;
  const project = await getProject(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="bg-black text-white min-h-screen">
      <Navbar logoText="Qodix" />
      
      <article className="pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="mb-12">
            <span className="text-sm font-mono tracking-widest text-white/50 uppercase mb-4 inline-block">{project.category}</span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">{project.title}</h1>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white font-medium rounded-full text-sm">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              {project.result_metric}
            </div>
          </div>
          
          {project.image && (
            <div className="aspect-video w-full rounded-2xl overflow-hidden mb-16 bg-white/5">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
            </div>
          )}
          
          <div 
            className="prose prose-invert prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: project.content || '<p>No content available.</p>' }}
          />
        </div>
      </article>

      {/* We need a simple way to fetch socials for the footer here, or hardcode fallback if not passed properly. 
          Ideally, a global layout fetches it, but for simplicity we will just pass a hardcoded list or fetch it here. */}
      <Footer logoText="Qodix" tagline="Ready to Tech It Easy? Let's talk." socials={[]} />
    </main>
  );
}
