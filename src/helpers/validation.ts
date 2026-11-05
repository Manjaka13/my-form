import rules from "@/helpers/rules";
import type { ErrorType } from "@/helpers/types";

/**
 * Validates input values, returns error code depending on the situation
 */

const valid: Record<keyof typeof rules, any> = {
  required: (value: unknown): ErrorType | boolean => rules.required(value) || { code: "required" },
  name: (value: string): ErrorType | boolean => rules.name(value) || { code: "name" },
  age: (value: string | number): ErrorType | boolean => rules.age(value) || { code: "age", params: { min: 0, max: 120 } },
  email: (value: string): ErrorType | boolean => rules.email(value) || { code: "email" },
  phone: (value: string): ErrorType | boolean => rules.phone(value) || { code: "phone" },
  password: (value: string): ErrorType | boolean => rules.password(value) || { code: "password", params: { min: 8 } },
  strongPassword: (value: string): ErrorType | boolean => rules.strongPassword(value) || { code: "password", params: { min: 8, lower: 1, upper: 1, numeric: 1, special: 1 } },
  url: (value: string): ErrorType | boolean => rules.url(value) || { code: "url" },
  number: (value: string | number): ErrorType | boolean => rules.number(value) || { code: "number" },
  integer: (value: string | number): ErrorType | boolean => rules.integer(value) || { code: "integer" },
  positiveNumber: (value: string | number): ErrorType | boolean => rules.positiveNumber(value) || { code: "positiveNumber" },
  date: (value: unknown): ErrorType | boolean => rules.date(value) || { code: "date" },
  postalCode: (value: string): ErrorType | boolean => rules.postalCode(value) || { code: "postalCode" },
  alphanumeric: (value: string): ErrorType | boolean => rules.alphanumeric(value) || { code: "alphanumeric" },
};

export default valid;
