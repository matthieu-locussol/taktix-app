import packageInfos from '../../package.json';

export const getVersion = (prefix = 'v') => {
   const version = `${prefix}${packageInfos.version}`;
   return version;
};
