import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		AutoImport({
			imports: ["vue", "vue-router"],
			dirs: ["./Web/src/composables/**", "./Web/src/directives/**"],
			dts: "./Web/src/types/auto-imports.d.ts",
		}),
		Components({
			dirs: ["./Web/src/components/**"],
			dts: "./Web/src/types/components.d.ts",
		}),
	],
});

// import Vue from '@vitejs/plugin-vue'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// import { defineConfig } from 'vite'
// import Inspect from 'vite-plugin-inspect'
// import AutoImport from '../src/vite'

// export default defineConfig({
//   plugins: [
//     Vue(),
//     Inspect(),
//     AutoImport({
//       imports: ['vue', '@vueuse/core'],
//       resolvers: [
//         ElementPlusResolver(),
//       ],
//       dirs: [
//         './composables/**',
//         './directives/**',
//       ],
//       vueTemplate: true,
//       vueDirectives: {
//         isDirective(normalizeImportFrom, _importEntry) {
//           return normalizeImportFrom.includes('/directives/')
//         },
//       },
//       dumpUnimportItems: true,
//     }),
//   ],
// })
