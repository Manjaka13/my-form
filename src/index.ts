import { createApp } from "vue";
import "@/register";
import App from "@/Demo.vue";

/**
 * Demo entry point
 */

createApp(App).mount("body");


export * from "@/helpers/types";
