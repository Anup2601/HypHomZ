import { z } from "zod";
import { validatePhoneNumber } from "./phoneUtils";

// Email validation regex
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Form validation schema
export const signUpSchema = z.object({
  title: z.string(),
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters" })
    .max(50, { message: "First name must be less than 50 characters" }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters" })
    .max(50, { message: "Last name must be less than 50 characters" }),
  countryCode: z.string(),
  countryIso2: z.string(),
  phoneNumber: z.string().min(1, { message: "Phone number is required" }),
  email: z
    .string()
    .regex(EMAIL_REGEX, { message: "Please enter a valid email address" }),
});

// Type for the form data
export type SignUpFormData = z.infer<typeof signUpSchema>;

// Helper function to validate a single field
export const validateField = (
  field: keyof SignUpFormData,
  value: string,
  formData: Partial<SignUpFormData>,
): string | null => {
  try {
    // Special handling for phone number
    if (field === "phoneNumber") {
      const countryCode = formData.countryCode || "+254";
      const validation = validatePhoneNumber(value, countryCode);
      if (!validation.isValid) {
        return validation.error || "Invalid phone number";
      }
      return null;
    }

    const fieldSchema = signUpSchema.shape[field];
    fieldSchema.parse(value);
    return null;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return error.errors[0]?.message || "Invalid input";
    }
    return "Validation error";
  }
};

// Helper function to validate the entire form
export const validateForm = (
  formData: Partial<SignUpFormData>,
): Record<string, string | null> => {
  const result: Record<string, string | null> = {};

  // Validate all fields except phone number with Zod
  try {
    signUpSchema.parse(formData);
  } catch (error) {
    if (error instanceof z.ZodError) {
      error.errors.forEach((err) => {
        if (err.path[0]) {
          result[err.path[0] as string] = err.message;
        }
      });
    }
  }

  // Special validation for phone number
  if (formData.phoneNumber) {
    const countryCode = formData.countryCode || "+254";
    const phoneValidation = validatePhoneNumber(
      formData.phoneNumber,
      countryCode,
    );
    if (!phoneValidation.isValid) {
      result.phoneNumber = phoneValidation.error || "Invalid phone number";
    }
  } else {
    result.phoneNumber = "Phone number is required";
  }

  return result;
};
