import type { NextRequest } from 'next/server';
import type { ARCHITECTURES } from '../../types/architectures';

import { fetchLatestGitHubRelease } from 'shared';

export const config = {
   runtime: 'edge',
};

const ARCHITECTURES_EXTENSION = {
   '.app.tar.gz': ['darwin-aarch64', 'darwin-x86_64'],
   '.AppImage.tar.gz': ['linux-x86_64'],
   '.msi.zip': ['windows-x86_64'],
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
   try {
      const { tag_name, published_at, assets } = await fetchLatestGitHubRelease();

      const computeSignature = async (url: string) => {
         const signatureData = await fetch(url);
         const signatureContent = await signatureData.text();

         return signatureContent;
      };

      return new Response(
         JSON.stringify({
            version: tag_name,
            notes: `Taktix ${tag_name}`,
            pub_date: published_at,
            platforms: (
               await Promise.all(
                  assets
                     .filter(({ name }) =>
                        ['.AppImage.tar.gz', '.app.tar.gz', '.msi.zip'].some((extension) =>
                           name.endsWith(extension),
                        ),
                     )
                     .map(async ({ name, browser_download_url }) => ({
                        signature: await computeSignature(`${browser_download_url}.sig`),
                        url: browser_download_url,
                        extension: ['.AppImage.tar.gz', '.app.tar.gz', '.msi.zip'].find(
                           (extension) => name.endsWith(extension),
                        ) as '.AppImage.tar.gz' | '.app.tar.gz' | '.msi.zip',
                     })),
               )
            ).reduce(
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
   } catch (error) {
      console.error(error);

      return new Response(
         JSON.stringify({
            updating: true,
         }),
         {
            status: 200,
            headers: {
               'content-type': 'application/json',
            },
         },
      );
   }
};

export default handler;
