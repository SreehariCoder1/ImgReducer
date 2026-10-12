import { blogData } from "../utils/blogData";
import { toolsData } from "../utils/toolsData";

export default async function sitemap() {
  const baseUrl = "https://www.img-reducer.com";

  // Base static routes
  const staticRoutes = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // Programmatic tool landing page routes
  const toolRoutes = toolsData.map((tool) => ({
    url: `${baseUrl}/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // Dynamic blog routes
  const blogRoutes = blogData.map((blog) => {
    const dateObj = new Date(blog.date);
    const lastMod = isNaN(dateObj.getTime()) ? new Date() : dateObj;

    return {
      url: `${baseUrl}/blog/${blog.id}`,
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.7,
    };
  });

  return [...staticRoutes, ...toolRoutes, ...blogRoutes];
}
