import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import { resolve } from "path";

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
	],

	resolve: {
		alias: {
			"@": resolve(__dirname, "src"),
		},
	},

	build: {
		lib: {
			entry: resolve(__dirname, "src/index.ts"),
			name: "MyForm",
			formats: ["es", "umd"],
			fileName: (format) => `my-form.${format}.js`,
			cssFileName: "my-form"
		},

		rollupOptions: {
			external: ["vue"],
			output: {
				globals: {
					vue: "Vue",
				},
			},
		},
	},
});
