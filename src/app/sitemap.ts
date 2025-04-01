import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    // Base URL for the website
    const baseUrl = 'https://itay.fyi'

    // Define the main routes of the website
    const routes = ['', '/about', '/projects', '/pert']

    // Current date for lastModified
    const currentDate = new Date()

    // Map routes to sitemap entries
    return routes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: route === '' ? 1.0 : 0.8,
    })) as MetadataRoute.Sitemap
}
