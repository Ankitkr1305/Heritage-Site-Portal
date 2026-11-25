import { INITIAL_MONUMENTS } from '@/data/initialData';
// Unit V: Dynamic Sitemap Generation for SEO Fundamentals
export default function sitemap() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const monumentUrls = INITIAL_MONUMENTS.map((m) => ({
        url: `${baseUrl}/monuments/${m.slug}`,
        lastModified: new Date(),
        changeFrequency: 'hourly',
        priority: 0.9,
    }));
    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'always',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/login`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        ...monumentUrls,
    ];
}
