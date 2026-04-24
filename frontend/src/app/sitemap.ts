import { MetadataRoute } from 'next';
import axios from 'axios';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  // Base routes
  const routes = ['', '/work', '/insights', '/privacy', '/terms', '/join'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  try {
    // Fetch dynamic content for sitemap
    // Note: Since this runs on the Next.js server, we use the backend URL
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
    
    // Fetch Blogs
    const blogsRes = await axios.get(`${backendUrl}/blogs/`);
    const blogs = Array.isArray(blogsRes.data) ? blogsRes.data : blogsRes.data.results || [];
    const blogUrls = blogs.map((blog: any) => ({
      url: `${baseUrl}/insights/${blog.slug}`,
      lastModified: blog.date ? new Date(blog.date).toISOString() : new Date().toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

    // Fetch Projects
    const projectsRes = await axios.get(`${backendUrl}/projects/`);
    const projects = Array.isArray(projectsRes.data) ? projectsRes.data : projectsRes.data.results || [];
    const projectUrls = projects.map((project: any) => ({
      url: `${baseUrl}/work/${project.slug}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    }));

    return [...routes, ...projectUrls, ...blogUrls];
  } catch (error) {
    console.error("Failed to fetch dynamic sitemap data", error);
    // Return at least the static routes if API fails
    return routes;
  }
}
