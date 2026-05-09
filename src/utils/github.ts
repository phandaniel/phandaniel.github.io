export interface GithubRepo {
	name: string;
	description: string | null;
	html_url: string;
	language: string | null;
	fork: boolean;
	stargazers_count: number;
}

export interface FeaturedRepo {
	title: string;
	description: string;
	url: string;
	language?: string;
	imageUrl: string;
}

const IMAGE_OVERRIDES: Record<string, string> = {
	chess: 'https://images.unsplash.com/photo-1528819622765-d6bcf132f793?q=80&w=800&auto=format&fit=crop',
	'phandaniel.github.io': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop',
};

export async function fetchFeaturedRepos(): Promise<FeaturedRepo[]> {
	const GITHUB_TOKEN = import.meta.env.GITHUB_TOKEN;
	const USERNAME = 'phandaniel';

	const headers: HeadersInit = {
		'User-Agent': 'Astro-Portfolio-Fetch',
	};

	if (GITHUB_TOKEN) {
		headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
	}

	try {
		const response = await fetch(`https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=12`, {
			headers,
		});

		if (!response.ok) {
			console.error(`GitHub API error: ${response.status} ${response.statusText}`);
			return [];
		}

		const repos: GithubRepo[] = await response.json();

		return repos
			.filter((repo) => !repo.fork)
			.map((repo) => ({
				title: repo.name.replace(/-/g, ' '),
				description: repo.description || 'No description provided.',
				url: repo.html_url,
				language: repo.language || undefined,
				imageUrl: IMAGE_OVERRIDES[repo.name] || `https://opengraph.githubassets.com/1/${USERNAME}/${repo.name}`,
			}));
	} catch (error) {
		console.error('Failed to fetch GitHub repositories:', error);
		return [];
	}
}
