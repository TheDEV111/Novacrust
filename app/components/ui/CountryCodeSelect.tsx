"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export interface Country {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
  format: string;
}

export const COUNTRIES: Country[] = [
  { code: "NG", name: "Nigeria", dialCode: "+234", flag: "🇳🇬", format: "000-000-0000" },
  { code: "US", name: "United States", dialCode: "+1", flag: "🇺🇸", format: "(000) 000-0000" },
  { code: "GB", name: "United Kingdom", dialCode: "+44", flag: "🇬🇧", format: "0000 000000" },
  { code: "GH", name: "Ghana", dialCode: "+233", flag: "🇬🇭", format: "000-000-0000" },
  { code: "KE", name: "Kenya", dialCode: "+254", flag: "🇰🇪", format: "000-000000" },
  { code: "ZA", name: "South Africa", dialCode: "+27", flag: "🇿🇦", format: "00-000-0000" },
  { code: "IN", name: "India", dialCode: "+91", flag: "🇮🇳", format: "00000-00000" },
  { code: "CA", name: "Canada", dialCode: "+1", flag: "🇨🇦", format: "(000) 000-0000" },
];

interface CountryCodeSelectProps {
  value: string;
  onChange: (country: Country) => void;
}

export default function CountryCodeSelect({ value, onChange }: CountryCodeSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedCountry = COUNTRIES.find((c) => c.dialCode === value) || COUNTRIES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={selectRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-5 bg-input-bg rounded-l-4xl hover:bg-gray-200 transition-colors border-r border-gray-300"
      >
        <span className="text-lg">{selectedCountry.flag}</span>
        <span className="text-sm font-medium text-foreground">{selectedCountry.dialCode}</span>
        <ChevronDown className={`w-4 h-4 text-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 left-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden">
          <div className="max-h-64 overflow-y-auto">
            {COUNTRIES.map((country) => (
              <button
                key={country.code}
                type="button"
                onClick={() => {
                  onChange(country);
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-primary hover:text-white transition-colors text-left group"
              >
                <span className="text-lg">{country.flag}</span>
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground group-hover:text-white">
                    {country.name}
                  </div>
                  <div className="text-xs text-text-gray group-hover:text-white">
                    {country.dialCode}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
