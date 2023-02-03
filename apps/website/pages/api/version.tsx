import type { NextRequest } from 'next/server';

export const config = {
   runtime: 'edge',
};

const RELEASE_ENDPOINT =
   'https://api.github.com/repos/matthieu-locussol/taktix-app/releases/latest';

const ARCHITECTURES = [
   'darwin-aarch64',
   'darwin-x86_64',
   'linux-x86_64',
   'windows-x86_64',
] as const;

const ARCHITECTURES_EXTENSION = {
   '.dmg': ['darwin-aarch64', 'darwin-x86_64'],
   '.deb': ['linux-x86_64'],
   '.msi': ['windows-x86_64'],
};

export interface Version {
   version: string;
   notes: string;
   pub_date: string;
   platforms: Record<
      (typeof ARCHITECTURES)[number],
      {
         signature: string;
         url: string;
      }
   >;
}

const handler = async (_: NextRequest) => {
   const data = await fetch(RELEASE_ENDPOINT);
   const json: GitHubRelease = await data.json();

   return new Response(
      JSON.stringify({
         version: json.tag_name,
         notes: `Taktix ${json.tag_name}`,
         pub_date: json.published_at,
         platforms: json.assets
            .filter(({ name }) =>
               ['.deb', '.dmg', '.msi'].some((extension) => name.endsWith(extension)),
            )
            .map(({ name, browser_download_url }) => ({
               signature: '',
               url: browser_download_url,
               extension: ['.deb', '.dmg', '.msi'].find((extension) => name.endsWith(extension)) as
                  | '.deb'
                  | '.dmg'
                  | '.msi',
            }))
            .reduce(
               (accExtension, { url, signature, extension }) => ({
                  ...accExtension,
                  ...ARCHITECTURES_EXTENSION[extension].reduce(
                     (accArchitectures, architecture) => ({
                        ...accArchitectures,
                        [architecture]: { signature, url },
                     }),
                     {},
                  ),
               }),
               {},
            ),
      }),
      {
         status: 200,
         headers: {
            'content-type': 'application/json',
         },
      },
   );
};

export default handler;

export interface GitHubRelease {
   url: string;
   assets_url: string;
   upload_url: string;
   html_url: string;
   id: number;
   author: Author;
   node_id: string;
   tag_name: string;
   target_commitish: string;
   name: string;
   draft: boolean;
   prerelease: boolean;
   created_at: string;
   published_at: string;
   assets: Asset[];
   tarball_url: string;
   zipball_url: string;
   body: string;
}

export interface Author {
   login: string;
   id: number;
   node_id: string;
   avatar_url: string;
   gravatar_id: string;
   url: string;
   html_url: string;
   followers_url: string;
   following_url: string;
   gists_url: string;
   starred_url: string;
   subscriptions_url: string;
   organizations_url: string;
   repos_url: string;
   events_url: string;
   received_events_url: string;
   type: string;
   site_admin: boolean;
}

export interface Asset {
   url: string;
   id: number;
   node_id: string;
   name: string;
   label: string;
   uploader: Uploader;
   content_type: string;
   state: string;
   size: number;
   download_count: number;
   created_at: string;
   updated_at: string;
   browser_download_url: string;
}

export interface Uploader {
   login: string;
   id: number;
   node_id: string;
   avatar_url: string;
   gravatar_id: string;
   url: string;
   html_url: string;
   followers_url: string;
   following_url: string;
   gists_url: string;
   starred_url: string;
   subscriptions_url: string;
   organizations_url: string;
   repos_url: string;
   events_url: string;
   received_events_url: string;
   type: string;
   site_admin: boolean;
}
