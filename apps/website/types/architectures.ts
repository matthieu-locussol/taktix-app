export const ARCHITECTURES = [
   'darwin-aarch64',
   'darwin-x86_64',
   'linux-x86_64',
   'windows-x86_64',
] as const;

export const EXTENSIONS = [
   '_x64.app.tar.gz',
   '.AppImage.tar.gz',
   '.msi.zip',
   '_aarch64.app.tar.gz',
] as const;

export type ArchitectureExtension = (typeof EXTENSIONS)[number];
