"use client";

import React, { useState, useEffect } from "react";
import BackButton from "./BackButton";
import InputField from "./InputField";
import TitleSelector from "./TitleSelector";
import CountryCodeSelector from "./CountryCodeSelector";
import {
  SignUpFormData,
  validateField,
  validateForm,
} from "./validationSchema";
import { CountryData, countries } from "./countryData";
import { formatPhoneNumber, getExamplePhoneNumber } from "./phoneUtils";

const SignUpForm: React.FC = () => {
  // Form state
  const [formData, setFormData] = useState<Partial<SignUpFormData>>({
    title: "Mr.",
    firstName: "",
    lastName: "",
    countryCode: "+254",
    countryIso2: "KE",
    phoneNumber: "",
    email: "",
  });

  // Phone input state
  const [phonePlaceholder, setPhonePlaceholder] = useState("Phone Number");

  // Validation errors state
  const [errors, setErrors] = useState<Record<string, string | null>>({});

  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Country state for the phone input
  const [country, setCountry] = useState<CountryData>(countries[0]);

  // Update country code in form data when country changes
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      countryCode: country.dialCode,
      countryIso2: country.iso2,
    }));

    // Update phone placeholder with example for the selected country
    setPhonePlaceholder(getExamplePhoneNumber(country.dialCode));

    // Format the existing phone number for the new country
    if (formData.phoneNumber) {
      const formattedNumber = formatPhoneNumber(
        formData.phoneNumber,
        country.dialCode,
      );
      setFormData((prev) => ({
        ...prev,
        phoneNumber: formattedNumber,
      }));
    }
  }, [country]);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Special handling for phone number to format as user types
    if (name === "phoneNumber") {
      const formattedNumber = formatPhoneNumber(value, country.dialCode);
      setFormData((prev) => ({
        ...prev,
        [name]: formattedNumber,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle title change
  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
    }));
  };

  // Handle country change
  const handleCountryChange = (selectedCountry: CountryData) => {
    setCountry(selectedCountry);
  };

  // Validate field on blur
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const fieldName = name as keyof SignUpFormData;

    const error = validateField(fieldName, value, formData);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  // Handle form submission
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    // Validate all fields
    const validationErrors = validateForm(formData as SignUpFormData);
    setErrors(validationErrors);

    // Check if there are any errors
    const hasErrors = Object.values(validationErrors).some(
      (error) => error !== null,
    );

    if (!hasErrors) {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        console.log("Form submitted successfully:", formData);
        setIsSubmitted(true);
      } catch (error) {
        console.error("Error submitting form:", error);
        setSubmitError(
          "An error occurred while submitting the form. Please try again.",
        );
      }
    }

    setIsSubmitting(false);
  };

  // If form is successfully submitted, show success message
  if (isSubmitted) {
    return (
      <main className="px-6 py-16 w-full min-h-screen bg-amber-400">
        <div className="flex flex-col items-center justify-center pt-10 mx-auto my-0 max-w-[343px] max-sm:pt-5">
          <div className="mb-6 text-3xl font-bold text-center text-gray-900 max-sm:text-2xl">
            Success!
          </div>
          <p className="text-center mb-8">
            Your account has been created successfully.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="px-5 py-3 w-full text-base font-bold bg-white rounded-xl cursor-pointer border-[none] text-zinc-700 max-sm:px-4 max-sm:py-2.5"
          >
            Back to Sign Up
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="px-6 py-16 w-full min-h-screen bg-amber-400">
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Roboto:wght@400;600;700&display=swap"
        rel="stylesheet"
      />

      <BackButton onClick={() => console.log("Back button clicked")} />

      <form
        className="flex flex-col gap-16 pt-10 mx-auto my-0 max-w-[343px] max-sm:pt-5"
        onSubmit={handleSignUp}
        noValidate
      >
        <h1 className="mb-10 text-3xl font-bold text-center text-gray-900 max-sm:text-2xl">
          Sign Up
        </h1>

        {submitError && (
          <div
            className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md"
            role="alert"
          >
            {submitError}
          </div>
        )}

        <section className="flex flex-col gap-5">
          <InputField
            label="First Name"
            placeholder="First Name"
            name="firstName"
            value={formData.firstName || ""}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={errors.firstName}
            required
            prefix={
              <TitleSelector
                selectedTitle={formData.title}
                onTitleChange={handleTitleChange}
              />
            }
            divider={true}
          />

          <InputField
            label="Last Name"
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName || ""}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={errors.lastName}
            required
          />

          <InputField
            label="Phone Number"
            placeholder={phonePlaceholder}
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber || ""}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={errors.phoneNumber}
            required
            prefix={
              <CountryCodeSelector
                selectedCountry={country}
                onCountryChange={handleCountryChange}
              />
            }
            divider={true}
          />

          <InputField
            label="Email"
            placeholder="Email"
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={errors.email}
            required
          />
        </section>

        <footer className="flex flex-col gap-4 items-center mt-10">
          <button
            type="submit"
            className={`px-5 py-3 w-full text-base font-bold rounded-xl cursor-pointer border-[none] text-zinc-700 max-sm:px-4 max-sm:py-2.5 ${
              isSubmitting
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-white hover:bg-gray-100"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing Up..." : "Sign Up"}
          </button>

          <p className="text-sm text-center text-black">
            Already have an Account?{" "}
            <a href="/signin" className="text-xs text-blue-700 underline">
              Sign in
            </a>
          </p>
        </footer>
      </form>
    </main>
  );
};

export default SignUpForm;
