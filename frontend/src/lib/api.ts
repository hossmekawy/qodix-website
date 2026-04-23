import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/';

export async function getHomepageData() {
  try {
    const response = await axios.get(`${API_URL}homepage-data/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching homepage data:", error);
    return null;
  }
}

export async function getProject(slug: string) {
  try {
    const response = await axios.get(`${API_URL}projects/${slug}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}

export async function getBlog(slug: string) {
  try {
    const response = await axios.get(`${API_URL}blogs/${slug}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
}

export async function getPageContent(slug: string) {
  try {
    const response = await axios.get(`${API_URL}pages/${slug}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching page:", error);
    return null;
  }
}

export async function getBlogs(category?: string, search?: string) {
  try {
    let url = `${API_URL}blogs/`;
    const params = new URLSearchParams();
    if (category && category !== 'All') params.append('category', category);
    if (search) params.append('search', search);
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

export async function getProjects(category?: string, search?: string) {
  try {
    let url = `${API_URL}projects/`;
    const params = new URLSearchParams();
    if (category && category !== 'All') params.append('category', category);
    if (search) params.append('search', search);
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export async function submitComment(data: any) {
  const response = await axios.post(`${API_URL}comments/`, data);
  return response.data;
}

export async function submitJobApplication(data: any) {
  const response = await axios.post(`${API_URL}join/`, data);
  return response.data;
}

export async function submitProjectInquiry(data: any) {
  const response = await axios.post(`${API_URL}inquiry/`, data);
  return response.data;
}
