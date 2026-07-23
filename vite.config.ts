import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'


function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

// The shadcn/ui components in src/app/components/ui were generated with
// version-pinned import specifiers (e.g. "lucide-react@0.487.0",
// "@radix-ui/react-dialog@1.1.6"). These don't match the actual package
// folder names in node_modules, so this plugin strips the trailing
// "@<version>" suffix and resolves against the real package instead.
function versionedImportResolver() {
  const versionedSpecifier = /^((?:@[^/]+\/)?[^@]+)@\d[\d.]*$/
  return {
    name: 'versioned-import-resolver',
    resolveId(id, importer) {
      const match = versionedSpecifier.exec(id)
      if (match) {
        return this.resolve(match[1], importer, { skipSelf: true })
      }
      return null
    },
  }
}

export default defineConfig({
  server: {
    allowedHosts: ['runic-untransparently-kit.ngrok-free.dev'],
  },
  plugins: [
    figmaAssetResolver(),
    versionedImportResolver(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/app'),
    },
  },
})
