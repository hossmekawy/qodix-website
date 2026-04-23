import { getBlog, getHomepageData } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ReadProgress from '@/components/ReadProgress';
import CommentsSection from '@/components/CommentsSection';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Share2 } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const blog = await getBlog(params.slug);
  if (!blog) return { title: 'Not Found' };
  
  return {
    title: `${blog.title} | Qodix Insights`,
    description: blog.summary,
    openGraph: {
      images: blog.image ? [blog.image] : [],
    }
  };
}

export default async function BlogDetail(props: PageProps) {
  const params = await props.params;
  const blog = await getBlog(params.slug);
  const homeData = await getHomepageData();
  const socials = homeData?.socials || [];

  if (!blog) {
    notFound();
  }

  return (
    <main className="bg-white text-black min-h-screen relative">
      <ReadProgress />
      
      <div className="bg-black">
        <Navbar logoText="Qodix" />
      </div>
      
      <article className="pt-32 pb-24 bg-white text-black">
        <div className="container mx-auto px-6 max-w-3xl">
          
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="flex items-center justify-center gap-4 text-sm font-mono uppercase tracking-widest text-black/50 mb-6">
              <span className="bg-black/5 px-3 py-1 rounded">{blog.category}</span>
              <span>{blog.read_time}</span>
              <span>{new Date(blog.date).toLocaleDateString()}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-8 leading-tight">{blog.title}</h1>
            <p className="text-xl text-black/60 leading-relaxed font-light">{blog.summary}</p>
          </div>
          
          {/* Author Block Top */}
          <div className="flex items-center justify-between border-y border-black/10 py-6 mb-12">
            <div className="flex items-center gap-4">
              {blog.author_avatar ? (
                <img src={blog.author_avatar} alt={blog.author_name} className="w-14 h-14 rounded-full object-cover bg-black/10" />
              ) : (
                <div className="w-14 h-14 rounded-full bg-black/10 flex items-center justify-center font-bold text-xl">
                  {blog.author_name ? blog.author_name[0] : 'Q'}
                </div>
              )}
              <div>
                <p className="font-bold text-lg">{blog.author_name || 'Qodix Team'}</p>
                <p className="text-sm text-black/50">{blog.author_role || 'Editorial'}</p>
              </div>
            </div>
            
            {/* Share Buttons */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold uppercase tracking-widest text-black/40 hidden md:block mr-2">Share</span>
              <button className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center hover:bg-black/10 transition-colors" title="Share">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Cover Image */}
          {blog.image && (
            <div className="aspect-video w-full rounded-2xl overflow-hidden mb-16 bg-black/5 border border-black/10 shadow-sm">
              <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
            </div>
          )}
          
          {/* Content */}
          <div 
            className="prose prose-lg md:prose-xl max-w-none prose-a:text-blue-600 hover:prose-a:text-blue-500 prose-img:rounded-2xl prose-headings:font-bold prose-headings:tracking-tight mb-16"
            dangerouslySetInnerHTML={{ __html: blog.content || '<p>Content coming soon.</p>' }}
          />

          {/* Comments Section */}
          <CommentsSection postId={blog.id} initialComments={blog.comments || []} />

        </div>
      </article>

      <Footer logoText="Qodix" tagline="Ready to Tech It Easy? Let's talk." socials={socials} />
    </main>
  );
}
