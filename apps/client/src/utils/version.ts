import packageInfos from '../../package.json';

export const getVersion = () => {
   const version = `v${packageInfos.version}`;
   return version;
};
