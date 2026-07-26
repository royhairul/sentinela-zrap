import { defineManifest } from '@crxjs/vite-plugin'
import pkg from './package.json'

export default defineManifest({
  manifest_version: 3,
  name: pkg.name,
  version: pkg.version,
  icons: {
    32: 'public/icons/logo32.png',
    48: 'public/icons/logo48.png',
    64: 'public/icons/logo64.png',
    128: 'public/icons/logo128.png',
  },
  action: {
    default_icon: {
      32: 'public/icons/logo32.png',
      48: 'public/icons/logo48.png',
      64: 'public/icons/logo64.png',
      128: 'public/icons/logo128.png',
    },
    default_popup: 'src/popup/index.html',
  },
  permissions: [
    'scripting',
    'sidePanel',
    'contentSettings',
    'tabs',
    'activeTab',
    'storage',
    'cookies',
    'webRequest',
    'declarativeNetRequest',
  ],
  host_permissions: [
    'https://*.instagram.com/*',
    'https://*.cdninstagram.com/*',
    'https://*.fbcdn.net/*',
    'https://*.tiktok.com/*',
    'https://*.tiktokcdn.com/*',
    'https://*.sentinela.my.id/*',
    'https://n8n.jagoansatudata.com/*',
  ],
  content_scripts: [
    {
      js: ['src/content/main.tsx'],
      matches: ['https://*.instagram.com/*'],
      run_at: 'document_idle',
    },
    {
      js: ['src/content/tiktok.ts'],
      matches: ['https://*.tiktok.com/*'],
      run_at: 'document_idle',
    },
    {
      js: ['src/content/sentinela-auth.ts'],
      matches: ['https://sentinela.my.id/*', 'https://*.sentinela.my.id/*'],
      run_at: 'document_idle',
    },
  ],
  options_ui: {
    page: 'src/options/index.html',
    open_in_tab: true,
  },
  side_panel: {
    default_path: 'src/sidepanel/index.html',
  },
  background: {
    service_worker: 'src/background/index.ts',
    type: 'module',
  },
})
