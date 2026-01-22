/**
 * electron-builder Configuration
 * Build settings for creating Windows installer and portable EXE
 */

module.exports = {
  appId: 'com.erav.ho',
  productName: 'erAV_Ho',
  directories: {
    output: 'release',
    buildResources: 'electron/resources'
  },
  files: [
    'dist/**/*',
    'dist-electron/**/*',
    'package.json'
  ],
  win: {
    target: [
      {
        target: 'nsis',
        arch: ['x64']
      },
      {
        target: 'portable',
        arch: ['x64']
      }
    ],
    icon: 'electron/resources/icon.ico',
    artifactName: '${productName}-${version}-${arch}.${ext}'
  },
  nsis: {
    oneClick: false,
    allowToChangeInstallationDirectory: true,
    createDesktopShortcut: true,
    createStartMenuShortcut: true,
    shortcutName: 'erAV_Ho',
    installerIcon: 'electron/resources/icon.ico',
    uninstallerIcon: 'electron/resources/icon.ico',
    installerHeaderIcon: 'electron/resources/icon.ico',
    perMachine: false,
    allowElevation: true
  },
  portable: {
    artifactName: '${productName}-${version}-portable.${ext}'
  },
  compression: 'maximum',
  asar: true,
  asarUnpack: ['**/*.node']
};
