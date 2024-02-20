import { RequestHandler } from 'express';
import { ChangelogSchema, fetchGitHubReleases } from 'shared';

const CHANGELOG_DEFAULT_MESSAGE = 'See the assets to download this version and install it.';

export const changelogRouter: RequestHandler = async (_, res) => {
   try {
      const releases = await fetchGitHubReleases();

      const payload: ChangelogSchema = {
         changelogs: releases
            .map((release) => ({
               ...release,
               body: release.body.replace(new RegExp(CHANGELOG_DEFAULT_MESSAGE, 'g'), ''),
            }))
            .filter(({ body }) => body !== '')
            .map(({ tag_name, published_at, body }) => ({
               id: tag_name,
               date: published_at,
               text: body.replace(/\r\n/g, '<br />'),
            })),
      };

      res.send(payload);
   } catch (e) {
      const payload: ChangelogSchema = {
         changelogs: [],
      };

      res.send(payload);
   }
};
