import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://fatedestinyofficial.com';
  
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    }
  ];

  // Dynamically add /services and its sub-pages
  const servicesDir = path.join(process.cwd(), 'src', 'app', 'services');
  
  if (fs.existsSync(servicesDir)) {
    // Add main /services page
    if (fs.existsSync(path.join(servicesDir, 'page.tsx'))) {
      routes.push({
        url: `${baseUrl}/services`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      });
    }

    // Scan for subdirectories (individual services)
    const subDirs = fs.readdirSync(servicesDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory());

    for (const dir of subDirs) {
      if (fs.existsSync(path.join(servicesDir, dir.name, 'page.tsx'))) {
        routes.push({
          url: `${baseUrl}/services/${dir.name}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.8,
        });
      }
    }
  }

  // Scan for other top-level pages in src/app (like about, contact)
  const appDir = path.join(process.cwd(), 'src', 'app');
  const topLevelDirs = fs.readdirSync(appDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory() && !['api', 'services'].includes(dirent.name));

  for (const dir of topLevelDirs) {
    if (fs.existsSync(path.join(appDir, dir.name, 'page.tsx'))) {
      routes.push({
        url: `${baseUrl}/${dir.name}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    }
  }

  return routes;
}
