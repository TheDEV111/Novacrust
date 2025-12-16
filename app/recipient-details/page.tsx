"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import Button from "../components/ui/Button";

const NIGERIAN_BANKS = [
  { value: "first-bank", label: "First bank" },
  { value: "wema", label: "wema" },
  { value: "sterling", label: "sterling" },
  { value: "zenith", label: "zenith" },
  { value: "kuda", label: "kuda" },
  { value: "moniepoint", label: "moniepoint" },
];

export default function RecipientDetails() {
  const router = useRouter();
  const [selectedBank, setSelectedBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("ODUTUGA GBEKE");
  const [errors, setErrors] = useState<{ bank?: string; accountNumber?: string }>({});

  const validateAccountNumber = (value: string) => {
    const nigerianAccountNumberRegex = /^\d{10}$/;
    return nigerianAccountNumberRegex.test(value);
  };

  const handleAccountNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 10) {
      setAccountNumber(value);
      if (errors.accountNumber) {
        setErrors({ ...errors, accountNumber: undefined });
      }
    }
  };

  const handleNext = () => {
    const newErrors: { bank?: string; accountNumber?: string } = {};

    if (!selectedBank) {
      newErrors.bank = "Please select a bank";
    }

    if (!accountNumber) {
      newErrors.accountNumber = "Account number is required";
    } else if (!validateAccountNumber(accountNumber)) {
      newErrors.accountNumber = "Account number must be 10 digits";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    router.push("/recipient-details-2");
  };

  return (
    <div className="flex min-h-screen bg-white">
      <div className="w-full max-w-2xl mx-auto px-6 py-8">
        <div className="mb-8 flex items-center justify-center relative">
          <button
            onClick={() => router.back()}
            className="absolute left-0 flex items-center justify-center w-10 h-10 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </button>
          
          <h1 className="font-bold text-2xl text-foreground">
            Recipient details
          </h1>
        </div>

        <div className="space-y-6 mt-5">
          <Select
            label="Bank"
            placeholder="Select an option"
            options={NIGERIAN_BANKS}
            value={selectedBank}
            onChange={setSelectedBank}
            error={errors.bank}
          />

          <Input
            label="Account number"
            placeholder="Enter your account number"
            value={accountNumber}
            onChange={handleAccountNumberChange}
            error={errors.accountNumber}
            type="text"
            inputMode="numeric"
          />

          <Input
            label="Account number"
            value={accountName}
            disabled
            readOnly
          />
        </div>

        <div className="mt-auto pt-12">
          <Button onClick={handleNext} fullWidth>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
