"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronDown, Search } from "lucide-react";

interface Currency {
  symbol: string;
  name: string;
  icon?: string;
}

interface CurrencyInputProps {
  label: string;
  amount: string;
  onAmountChange: (value: string) => void;
  selectedCurrency: string;
  onCurrencyChange: (symbol: string) => void;
  currencies: Currency[];
  readOnly?: boolean;
}

export default function CurrencyInput({
  label,
  amount,
  onAmountChange,
  selectedCurrency,
  onCurrencyChange,
  currencies,
  readOnly = false,
}: CurrencyInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredCurrencies = currencies.filter(
    (currency) =>
      currency.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      currency.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentCurrency = currencies.find((c) => c.symbol === selectedCurrency);

  return (
    <div className="w-full p-6 bg-white border border-gray-200 rounded-4xl">
      <label className="block text-sm mb-3" style={{ color: '#828282' }}>{label}</label>
      <div className="flex items-center justify-between gap-4">
        <input
          type="text"
          value={amount}
          onChange={(e) => {
            const value = e.target.value;
            if (value === '' || /^\d*\.?\d*$/.test(value)) {
              onAmountChange(value);
            }
          }}
          readOnly={readOnly}
          className="text-3xl font-bold text-black bg-transparent border-none outline-none flex-1"
          placeholder="0.00"
        />
        
        <div ref={dropdownRef} className="relative">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors"
          >
            {currentCurrency?.icon && (
              <Image src={currentCurrency.icon} alt={currentCurrency.symbol} width={20} height={20} className="w-5 h-5" />
            )}
            <span className="text-sm font-medium text-foreground">
              {currentCurrency?.symbol || selectedCurrency}
            </span>
            <ChevronDown className={`w-4 h-4 text-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
          </button>

          {isOpen && (
            <div className="absolute right-0 top-full mt-2 w-72 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl">
                  <Search className="w-5 h-5 text-text-gray" />
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent text-sm outline-none flex-1 text-foreground placeholder:text-text-gray"
                  />
                </div>
              </div>
              
              <div className="max-h-64 overflow-y-auto">
                {filteredCurrencies.map((currency) => (
                  <button
                    key={currency.symbol}
                    type="button"
                    onClick={() => {
                      onCurrencyChange(currency.symbol);
                      setIsOpen(false);
                      setSearchQuery("");
                    }}
                      className="w-full flex items-center gap-3 px-6 py-4 hover:bg-gray-50 transition-colors text-left"
                    >
                      {currency.icon ? (
                        <Image src={currency.icon} alt={currency.symbol} width={32} height={32} className="w-8 h-8" />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium">
                          {currency.symbol.slice(0, 2)}
                        </div>
                      )}
                      <span className="text-sm font-medium text-foreground">
                        {currency.symbol} - {currency.name}
                      </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
