"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Tabs from "./components/ui/Tabs";
import CurrencyInput from "./components/ui/CurrencyInput";
import WalletSelect from "./components/ui/WalletSelect";
import Button from "./components/ui/Button";

const TABS = [
  { id: "crypto-to-cash", label: "Crypto to cash" },
  { id: "cash-to-crypto", label: "Cash to crypto" },
  { id: "crypto-to-fiat-loan", label: "Crypto to fiat loan" },
];

const CRYPTO_CURRENCIES = [
  { symbol: "ETH", name: "Ethereum", icon: "/eth.svg" },
  { symbol: "USDT", name: "CELO", icon: "/USDT-celo.svg" },
  { symbol: "USDT", name: "TON", icon: "/USDT-ton.svg" },
  { symbol: "USDT", name: "BNB", icon: "/USDT-bnb.svg" },
];

const FIAT_CURRENCIES = [
  { symbol: "NGN", name: "Nigerian Naira", icon: "/ngn.svg" },
  { symbol: "USD", name: "US Dollar",  },
  { symbol: "EUR", name: "Euro" },
];

const CRYPTO_WALLETS = [
  { id: "metamask", name: "Metamask", icon: "/metamask.svg" },
  { id: "rainbow", name: "Rainbow", icon: "/rainbow.svg" },
  { id: "walletconnect", name: "WalletConnect", icon: "/wallet-connect.svg" },
  { id: "other", name: "Other Crypto Wallets (Binance, Coinbase, Bybit etc)" },
];

const EXCHANGE_RATES: Record<string, Record<string, number>> = {
  ETH: { NGN: 1650000, USD: 3500, EUR: 3200 },
  "USDT-CELO": { NGN: 1650, USD: 1, EUR: 0.92 },
  "USDT-TON": { NGN: 1650, USD: 1, EUR: 0.92 },
  "USDT-BNB": { NGN: 1650, USD: 1, EUR: 0.92 },
};

export default function Home() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("crypto-to-cash");
  const [youPayAmount, setYouPayAmount] = useState("1.00");
  const [youReceiveAmount, setYouReceiveAmount] = useState("1.00");
  const [selectedPayCurrency, setSelectedPayCurrency] = useState("ETH");
  const [selectedReceiveCurrency, setSelectedReceiveCurrency] = useState("NGN");
  const [selectedWalletFrom, setSelectedWalletFrom] = useState("");
  const [selectedWalletTo, setSelectedWalletTo] = useState("");

  useEffect(() => {
    if (activeTab === "crypto-to-cash") {
      const rate = EXCHANGE_RATES[selectedPayCurrency]?.[selectedReceiveCurrency] || 1;
      const parsedAmount = parseFloat(youPayAmount);
      const calculated = isNaN(parsedAmount) ? "0.00" : (parsedAmount * rate).toFixed(2);
      setYouReceiveAmount(calculated);
    }
  }, [youPayAmount, selectedPayCurrency, selectedReceiveCurrency, activeTab]);

  const handleConvert = () => {
    router.push("/recipient-details");
  };

  return (
    <div className="flex min-h-screen">
      <main className="w-full max-w-2xl mx-auto px-6 py-12">
        <Tabs tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === "crypto-to-cash" ? (
          <div className="space-y-6">
            <CurrencyInput
              label="You pay"
              amount={youPayAmount}
              onAmountChange={setYouPayAmount}
              selectedCurrency={selectedPayCurrency}
              onCurrencyChange={setSelectedPayCurrency}
              currencies={CRYPTO_CURRENCIES}
            />

            <CurrencyInput
              label="You receive"
              amount={youReceiveAmount}
              onAmountChange={setYouReceiveAmount}
              selectedCurrency={selectedReceiveCurrency}
              onCurrencyChange={setSelectedReceiveCurrency}
              currencies={FIAT_CURRENCIES}
              readOnly
            />

            <WalletSelect
              label="Pay from"
              value={selectedWalletFrom}
              onChange={setSelectedWalletFrom}
              options={CRYPTO_WALLETS}
              placeholder="Select an option"
            />

            <WalletSelect
              label="Pay to"
              value={selectedWalletTo}
              onChange={setSelectedWalletTo}
              options={CRYPTO_WALLETS}
              placeholder="Select an option"
            />

            <div className="pt-6">
              <Button onClick={handleConvert} fullWidth>
                Convert now
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 text-text-gray">
            <p>This tab is under construction</p>
          </div>
        )}
      </main>
    </div>
  );
}
