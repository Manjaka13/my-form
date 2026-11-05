import "@/styles/vars.css";
import { defineCustomElement } from "vue";
import MyButton from "@/components/MyButton.ce.vue";
import MySpinner from "@/components/MySpinner.ce.vue";
import MySwitch from "@/components/MySwitch.ce.vue";
import MyClamp from "@/components/MyClamp.ce.vue";
import MyForm from "@/components/MyForm.ce.vue";
import MyInputWrapper from "@/components/MyInputWrapper.ce.vue";
import MyInput from "@/components/MyInput.ce.vue";

/**
 * Register as web components
 */

customElements.define("my-button", defineCustomElement(MyButton));
customElements.define("my-spinner", defineCustomElement(MySpinner));
customElements.define("my-switch", defineCustomElement(MySwitch));
customElements.define("my-clamp", defineCustomElement(MyClamp));
customElements.define("my-form", defineCustomElement(MyForm));
customElements.define("my-input-wrapper", defineCustomElement(MyInputWrapper));
customElements.define("my-input", defineCustomElement(MyInput));
