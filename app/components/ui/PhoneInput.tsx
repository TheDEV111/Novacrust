"use client";

import { useState } from "react";
import CountryCodeSelect, { Country, COUNTRIES } from "./CountryCodeSelect";

interface PhoneInputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export default function PhoneInput({ label, value, onChange, error }: PhoneInputProps) {
  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]);

  const formatPhoneNumber = (input: string, format: string) => {
    const numbers = input.replace(/\D/g, "");
    let formatted = "";
    let numberIndex = 0;

    for (let i = 0; i < format.length && numberIndex < numbers.length; i++) {
      if (format[i] === "0") {
        formatted += numbers[numberIndex];
        numberIndex++;
      } else {
        formatted += format[i];
      }
    }

    return formatted;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, "");
    const maxLength = selectedCountry.format.replace(/\D/g, "").length;
    
    if (input.length <= maxLength) {
      onChange(input);
    }
  };

  const displayValue = formatPhoneNumber(value, selectedCountry.format);

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-normal text-foreground mb-2">
          {label}
        </label>
      )}
      <div className="flex items-stretch">
        <CountryCodeSelect
          value={selectedCountry.dialCode}
          onChange={setSelectedCountry}
        />
        <input
          type="tel"
          value={displayValue}
          onChange={handlePhoneChange}
          placeholder={selectedCountry.format}
          className="flex-1 px-4 py-5 bg-input-bg rounded-r-4xl text-base placeholder:text-text-gray focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>
      {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
    </div>
  );
}
