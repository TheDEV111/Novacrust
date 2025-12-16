"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Input from "../components/ui/Input";
import PhoneInput from "../components/ui/PhoneInput";
import Button from "../components/ui/Button";

export default function RecipientDetails2() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState<{ email?: string; phone?: string }>({});

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleNext = () => {
    const newErrors: { email?: string; phone?: string } = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!phoneNumber) {
      newErrors.phone = "Phone number is required";
    } else if (phoneNumber.length < 10) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    router.push("/");
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors({ ...errors, email: undefined });
    }
  };

  const handlePhoneChange = (value: string) => {
    setPhoneNumber(value);
    if (errors.phone) {
      setErrors({ ...errors, phone: undefined });
    }
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
          <Input
            label="Recipient email"
            placeholder="Enter recipient email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            error={errors.email}
          />

          <PhoneInput
            label="Recipient phone number"
            value={phoneNumber}
            onChange={handlePhoneChange}
            error={errors.phone}
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
