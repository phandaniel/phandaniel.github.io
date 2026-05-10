import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchFeaturedRepos, clearCache } from '../../src/utils/github';

global.fetch = vi.fn();

describe('fetchFeaturedRepos', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    clearCache();
  });

  it('fetches and formats repositories correctly', async () => {
    const mockRepos = [
      {
        name: 'test-repo',
        description: 'A test repository',
        html_url: 'https://github.com/phandaniel/test-repo',
        language: 'TypeScript',
        fork: false,
      },
    ];

    (fetch as any).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockRepos),
    });

    const result = await fetchFeaturedRepos('phandaniel');

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      title: 'test repo',
      description: 'A test repository',
      url: 'https://github.com/phandaniel/test-repo',
      language: 'TypeScript',
      imageUrl: 'https://opengraph.githubassets.com/1/phandaniel/test-repo',
    });
  });

  it('handles API errors gracefully', async () => {
    (fetch as any).mockResolvedValue({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    });

    const result = await fetchFeaturedRepos('phandaniel');
    expect(result).toEqual([]);
  });

  it('filters out forks', async () => {
    const mockRepos = [
      { name: 'original', fork: false },
      { name: 'forked', fork: true },
    ];

    (fetch as any).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockRepos),
    });

    const result = await fetchFeaturedRepos('phandaniel');
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('original');
  });
});
