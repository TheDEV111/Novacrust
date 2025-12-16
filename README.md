# NovaCrust Crypto Checkout

A modern crypto-to-cash checkout experience built with Next.js 15, TypeScript, and Tailwind CSS. This application provides a seamless interface for converting cryptocurrency to fiat currency with integrated recipient details collection.

## Project Overview

This is a crypto checkout flow similar to Stripe Checkout but designed for cryptocurrency payments. Users can select their crypto asset, specify the amount, choose their wallet, and provide recipient banking details for cash withdrawal.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Fonts**: Outfit (Google Fonts)

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/TheDEV111/Novacrust.git
cd novacrust-test
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

3. Run the development server:
```bash
pnpm dev
# or
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/
├── components/
│   └── ui/
│       ├── Button.tsx              # Primary button component
│       ├── CurrencyInput.tsx       # Amount input with currency selector
│       ├── Input.tsx               # Standard text input
│       ├── PhoneInput.tsx          # Phone input with country code
│       ├── CountryCodeSelect.tsx   # Country code dropdown
│       ├── Select.tsx              # Standard dropdown select
│       ├── Tabs.tsx                # Tab navigation component
│       └── WalletSelect.tsx        # Crypto wallet selector
├── recipient-details/
│   └── page.tsx                    # Bank details collection (Step 1)
├── recipient-details-2/
│   └── page.tsx                    # Email & phone collection (Step 2)
├── page.tsx                        # Main payment form (Home)
├── layout.tsx                      # Root layout with font configuration
└── globals.css                     # Global styles and theme colors

public/
├── eth.svg                         # Ethereum logo
├── USDT-celo.svg                   # USDT on Celo logo
├── USDT-ton.svg                    # USDT on TON logo
└── USDT-bnb.svg                    # USDT on BNB logo
```

## User Flow

1. **Payment Form** (`/`)
   - Select payment type via tabs (Crypto to cash, Cash to crypto, Crypto to fiat loan)
   - Enter amount to pay
   - Select cryptocurrency (ETH, USDT-CELO, USDT-TON, USDT-BNB)
   - View auto-calculated receive amount in NGN/USD/EUR
   - Select payment source wallet
   - Select payment destination wallet
   - Click "Convert now"

2. **Recipient Details - Page 1** (`/recipient-details`)
   - Select bank (Nigerian banks: First Bank, Wema, Sterling, Zenith, Kuda, Moniepoint)
   - Enter 10-digit account number
   - View auto-populated account name (currently static)
   - Click "Next"

3. **Recipient Details - Page 2** (`/recipient-details-2`)
   - Enter recipient email with validation
   - Enter recipient phone number with country code selector
   - Phone formats auto-adjust based on selected country
   - Click "Next" to complete

## Key Features

### Reusable Components
All UI components are built to be reusable and consistent:
- Rounded-4xl border radius throughout
- Primary teal color (#0F5257)
- Consistent spacing and typography
- Accessible form validation

### Currency Conversion
Real-time calculation between crypto and fiat currencies using predefined exchange rates:
- ETH: 1 ETH = 1,650,000 NGN
- USDT variants: 1 USDT = 1,650 NGN (stablecoin peg)

### Input Validation
- **Account Number**: Must be exactly 10 digits (Nigerian standard)
- **Email**: Standard email format validation
- **Phone Number**: Format validation based on selected country
- **Amount**: Numbers and decimals only, no alphabetic characters

### Phone Number Formatting
Supports multiple country formats:
- Nigeria: 000-000-0000
- US/Canada: (000) 000-0000
- UK: 0000 000000
- Ghana: 000-000-0000
- Kenya: 000-000000
- South Africa: 00-000-0000
- India: 00000-00000

### Responsive Design
Mobile-first approach with max-width containers (768px) for optimal viewing on all devices.

## Design System

### Colors
```css
--primary: #0F5257          /* Teal - primary actions */
--primary-hover: #0d4348    /* Darker teal - hover states */
--background: #fafafa       /* Off-white background */
--foreground: #0a0a0a       /* Near-black text */
--input-bg: #f0f0f0         /* Light gray input backgrounds */
--text-gray: #4a5568        /* Medium gray for labels */
```

### Typography
- **Font Family**: Outfit (Google Fonts)
- **Heading**: 2xl, bold
- **Labels**: sm, normal
- **Body**: base
- **Input Values**: 3xl, bold (currency inputs)

## Assumptions & Trade-offs

### Assumptions
1. **Account Name Resolution**: Currently returns a static name ("ODUTUGA GBEKE"). In production, this would integrate with a bank API to verify and fetch the actual account name.

2. **Exchange Rates**: Using fixed rates stored in the frontend. Production would fetch real-time rates from a crypto exchange API.

3. **Wallet Integration**: Wallet selection is UI-only. Actual wallet connection (Web3) not implemented for this assessment.

4. **Nigerian Banking Focus**: Primary focus on Nigerian banks and NGN currency as specified in requirements.

5. **Country List**: Limited to 8 major countries for the phone input. Expandable based on requirements.

### Trade-offs
1. **Client-Side Validation Only**: No backend validation. Production would require server-side validation and API endpoints.

2. **Static Data**: Banks, currencies, and wallets are hardcoded. Production would fetch from a configuration API.

3. **No Persistence**: Form data is not persisted. Users lose progress on page refresh. Would implement localStorage or session management.

4. **No Authentication**: No user accounts or authentication. Production would require user management.

5. **Simplified Flow**: Actual crypto transaction and blockchain interaction not implemented. Focus is on UI/UX and form handling.

6. **Limited Error Handling**: Basic validation only. Production would need comprehensive error handling, loading states, and API error management.

7. **No Testing**: No unit or integration tests included. Production would require comprehensive test coverage.

## Future Enhancements

- [ ] Backend API integration for account verification
- [ ] Real-time cryptocurrency exchange rates
- [ ] Web3 wallet connection (MetaMask, WalletConnect)
- [ ] Transaction history and tracking
- [ ] User authentication and profile management
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Comprehensive test suite
- [ ] Rate limiting and security measures
- [ ] Analytics and monitoring

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

This is an assessment project for NovaCrust.

## Contact

For questions or feedback, please reach out to the development team.
