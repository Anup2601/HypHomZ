import React, { ReactNode, useState, useEffect } from "react";

interface InputFieldProps {
  label: string;
  placeholder: string;
  type?: string;
  prefix?: ReactNode;
  divider?: boolean;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string | null;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  type = "text",
  prefix,
  divider = false,
  name,
  value,
  onChange,
  onBlur,
  error,
  required = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showError, setShowError] = useState(false);

  // Show error after user has interacted with the field
  useEffect(() => {
    if (error && !isFocused && value !== "") {
      setShowError(true);
    } else {
      setShowError(false);
    }
  }, [error, isFocused, value]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    if (onBlur) {
      onBlur(e);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={name}
        className="text-base font-semibold tracking-normal text-zinc-900"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div
        className={`flex gap-3 items-center p-3 rounded-lg bg-neutral-100 bg-opacity-80 max-sm:p-2.5 ${
          showError ? "border border-red-500" : ""
        }`}
      >
        {prefix && (
          <>
            {prefix}
            {divider && (
              <div className="mx-2 my-0 w-0.5 h-5 bg-indigo-500 rounded-sm" />
            )}
          </>
        )}
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="w-full text-sm font-semibold border-[none] text-black text-opacity-30 bg-transparent outline-none"
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
        />
      </div>
      {showError && error && (
        <p
          id={`${name}-error`}
          className="text-xs text-red-500 mt-1"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default InputField;
