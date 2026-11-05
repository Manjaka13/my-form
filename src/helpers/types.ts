import { BUTTON_TYPES, COLORS } from "@/helpers/const";
import type rules from "@/helpers/rules";

/**
 * Global types/interfaces
 */

export type ColorType = (typeof COLORS)[number];
export type ButtonType = (typeof BUTTON_TYPES)[number];
export type ErrorCode = keyof typeof rules;
export interface ErrorType {
	code: ErrorCode;
	params?: unknown;
}
export type InputType =
	| "text"
	| "email"
	| "password"
	| "number"
	| "tel"
	| "url"
	| "date"
	| "time"
	| "datetime-local"
	| "month"
	| "week"
	| "search"
	| "color"
	| "file"
	| "checkbox"
	| "radio"
	| "range"
	| "hidden"
	| "submit"
	| "reset"
	| "button";
