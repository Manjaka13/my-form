import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "unplugin-dts/vite"; 

export default defineConfig({
	plugins: [
		vue({
			customElement: /\.ce\.vue$/,
			template: {
				compilerOptions: {
					isCustomElement: (tag) => tag.startsWith("my-"),
				},
			},
		}),
		dts({
			tsconfigPath: "./tsconfig.app.json",
			bundleTypes: true,
		}),
	],

	resolve: {
		alias: {
			"@": resolve(import.meta.dirname, "src"),
		},
	},

	build: {
		lib: {
			entry: resolve(import.meta.dirname, "src/index.ts"),
			name: "MyForm",
			formats: ["es", "umd"],
			fileName: (format) => (format === "es" ? "my-form.es.js" : "my-form.umd.cjs"),
			cssFileName: "my-form",
		},

		rollupOptions: {
			external: ["vue"],
			output: { globals: { vue: "Vue" } },
		},
	},
});
