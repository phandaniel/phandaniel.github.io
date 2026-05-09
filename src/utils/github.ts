export interface FeaturedRepo {
	title: string;
	description: string;
	url: string;
	language?: string;
	imageUrl: string;
}

/**
 * Cache for GitHub API responses to prevent rate limiting during build
 */
const repoCache = new Map<string, any[]>();

export async function fetchFeaturedRepos(username: string = 'phandaniel'): Promise<FeaturedRepo[]> {
	const GITHUB_TOKEN = import.meta.env.GITHUB_TOKEN;
	
	if (repoCache.has(username)) {
		return repoCache.get(username)!;
	}

	const headers: HeadersInit = {
		'User-Agent': 'Astro-Portfolio-Fetch',
	};

	if (GITHUB_TOKEN) {
		headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
	} else {
        console.warn('GITHUB_TOKEN is missing. GitHub API requests will be unauthenticated and subject to lower rate limits.');
    }

	try {
		const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=20`, {
			headers,
		});

		if (!response.ok) {
            // Return empty if rate limited or other error
			console.error(`GitHub API error: ${response.status} ${response.statusText}`);
			return [];
		}

		const repos: any[] = await response.json();

		const featured = repos
			.filter((repo: any) => !repo.fork)
			.map((repo: any) => ({
				title: repo.name.replace(/-/g, ' '),
				description: repo.description || 'No description provided.',
				url: repo.html_url,
				language: repo.language || undefined,
				imageUrl: `https://opengraph.githubassets.com/1/${username}/${repo.name}`,
			}));
            
        repoCache.set(username, featured);
        return featured;
	} catch (error) {
		console.error('Failed to fetch GitHub repositories:', error);
		return [];
	}
}
