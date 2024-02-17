import { z } from 'zod';

export const GITHUB_RELEASES_ENDPOINT =
   'https://api.github.com/repos/matthieu-locussol/taktix-app/releases';

export const GITHUB_LATEST_RELEASE_ENDPOINT =
   'https://api.github.com/repos/matthieu-locussol/taktix-app/releases/latest';

export const zGitHubReleaseAsset = z.object({
   name: z.string(),
   browser_download_url: z.string(),
});

export type GitHubReleaseAsset = z.infer<typeof zGitHubReleaseAsset>;

export const zGitHubRelease = z.object({
   tag_name: z.string(),
   published_at: z.string(),
   assets: z.array(zGitHubReleaseAsset),
   body: z.string(),
});

export type GitHubRelease = z.infer<typeof zGitHubRelease>;

export const fetchGitHubReleases = async () => {
   const response = await fetch(GITHUB_RELEASES_ENDPOINT);
   const json = await response.json();

   return z.array(zGitHubRelease).parse(json);
};

export const fetchLatestGitHubRelease = async () => {
   const response = await fetch(GITHUB_LATEST_RELEASE_ENDPOINT);
   const json = await response.json();

   return zGitHubRelease.parse(json);
};
