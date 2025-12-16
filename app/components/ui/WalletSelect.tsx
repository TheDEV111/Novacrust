"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Wallet } from "lucide-react";

interface WalletOption {
  id: string;
  name: string;
  icon?: string;
}

interface WalletSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: WalletOption[];
  placeholder?: string;
}

export default function WalletSelect({
  label,
  value,
  onChange,
  options,
  placeholder = "Select an option",
}: WalletSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.id === value);

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-foreground mb-3">
        {label}
      </label>
      
      <div ref={selectRef} className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-5 py-4 bg-white border border-gray-300 rounded-4xl text-base text-left flex items-center justify-between hover:border-gray-400 transition-colors"
        >
          <span className={selectedOption ? "text-foreground font-medium" : "text-text-gray"}>
            {selectedOption?.name || placeholder}
          </span>
          <ChevronDown className={`w-5 h-5 text-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </button>

        {isOpen && (
          <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">
            {options.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => {
                  onChange(option.id);
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-3 px-5 py-4 hover:bg-primary hover:text-white transition-colors text-left border-b border-gray-100 last:border-b-0 group"
              >
                <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-white flex items-center justify-center">
                  {option.icon ? (
                    <img src={option.icon} alt={option.name} className="w-5 h-5" />
                  ) : (
                    <Wallet className="w-4 h-4 text-foreground group-hover:text-primary" />
                  )}
                </div>
                <span className="text-sm font-medium text-foreground group-hover:text-white">
                  {option.name}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
