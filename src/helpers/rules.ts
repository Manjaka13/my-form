/**
 * Validation rules
 */

const rules = {
	// Required
	required: (value: unknown) => {
		if (value === null || value === undefined) return false;
		if (typeof value === "string") return value.trim().length > 0;
		if (Array.isArray(value)) return value.length > 0;
		return true;
	},

	// Name / Firstname
	name: (value: string) => {
		return /^[\p{L}][\p{L}\s'-]*$/u.test(value.trim());
	},

	// Age
	age: (value: string | number) => {
		const n = Number(value);
		return Number.isInteger(n) && n >= 0 && n <= 120;
	},

	// Email
	email: (value: string) => {
		return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value.trim());
	},

	// Phone
	phone: (value: string) => {
		return /^\+?[0-9\s().-]{7,20}$/.test(value.trim());
	},

	// Password
	password: (value: string) => {
		return value.length >= 8;
	},

	// Strong password
	strongPassword: (value: string) => {
		return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/.test(value);
	},

	// URL
	url: (value: string) => {
		try {
			const parsed = new URL(value);
			return ["http:", "https:"].includes(parsed.protocol);
		} catch {
			return false;
		}
	},

	// Number
	number: (value: string | number) => {
		return value !== "" && Number.isFinite(Number(value));
	},

	// Integer
	integer: (value: string | number) => {
		return Number.isInteger(Number(value)) && value !== "";
	},

	// Positive number
	positiveNumber: (value: string | number) => {
		return Number.isFinite(Number(value)) && Number(value) > 0;
	},

	// Date
	date: (value: unknown) => {
		if (value instanceof Date) return !isNaN(value.getTime());
		if (typeof value !== "string" && typeof value !== "number") return false;
		if (typeof value === "string" && !value.trim()) return false;

		const date = new Date(value);

		return !isNaN(date.getTime());
	},

	// Postal code
	postalCode: (value: string) => {
		return /^[a-zA-Z0-9\s-]{3,12}$/.test(value.trim());
	},

	// Alphanumeric
	alphanumeric: (value: string) => {
		return /^[a-zA-Z0-9]+$/.test(value);
	},
};

export default rules;
