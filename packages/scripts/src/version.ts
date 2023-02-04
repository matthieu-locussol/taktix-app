import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const getVersion = () => {
   const filePath = resolve(__dirname, '../../../package.json');
   const fileBlob = readFileSync(filePath, 'utf8');
   const packageJson = JSON.parse(fileBlob);
   const { version } = packageJson;
   return version;
};

const bumpVersion = () => {
   const version = getVersion();

   const cargoFilePath = resolve(__dirname, '../../../apps/client/src-tauri/Cargo.toml');
   const cargoFileBlob = readFileSync(cargoFilePath, 'utf8');
   const newCargoFile = cargoFileBlob.replace(/version = .*/, `version = "${version}"`);
   writeFileSync(cargoFilePath, newCargoFile);

   const tauriFilePath = resolve(__dirname, '../../../apps/client/src-tauri/tauri.conf.json');
   const tauriFileBlob = readFileSync(tauriFilePath, 'utf8');
   const newTauriFile = tauriFileBlob.replace(/"version": .*/, `"version": "${version}"`);
   writeFileSync(tauriFilePath, newTauriFile);

   const clientFilePath = resolve(__dirname, '../../../apps/client/package.json');
   const clientFileBlob = readFileSync(clientFilePath, 'utf8');
   const newClientFile = clientFileBlob.replace(/"version": .*/, `"version": "${version}"`);
   writeFileSync(clientFilePath, newClientFile);
};

bumpVersion();
