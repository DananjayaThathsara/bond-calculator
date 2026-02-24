# Bond Yield Calculator - Frontend

A modern React frontend for calculating bond yields, analyzing bonds, and viewing cash flow schedules.

## Features

- **Bond Calculator Form**: Input bond parameters (face value, coupon rate, market price, years to maturity, coupon frequency)
- **Yield Calculations**: Displays current yield, yield to maturity (YTM), total interest, and bond status (premium/discount/par)
- **Cash Flow Schedule**: View detailed payment schedule with coupon payments and cumulative interest
- **Responsive Design**: Styled with Tailwind CSS for a modern, clean interface
- **Auto-scroll**: Automatically scrolls to results after calculation
- **Real-time Validation**: Form validation with required fields

## Tech Stack

- **React 19.2.0**: UI library
- **TypeScript**: Type-safe development
- **Vite 7.3.1**: Fast build tool and dev server
- **Tailwind CSS 4.2.1**: Utility-first CSS framework
- **Jost Font**: Google Fonts custom typography

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

Create a production build:

```bash
npm run build
```

### Preview

Preview the production build locally:

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── BondForm.tsx           # Form for bond input parameters
│   ├── ResultsSummary.tsx     # Display calculation results
│   └── CashFlowTable.tsx      # Display payment schedule
├── api/
│   └── bondApi.ts             # API calls to backend
├── types/
│   └── bond.types.ts          # TypeScript type definitions
├── App.tsx                    # Main application component
├── main.tsx                   # React entry point
└── index.css                  # Global styles

```

## Components

### BondForm

Collects bond parameters from the user:

- Face Value
- Annual Coupon Rate (%)
- Market Price
- Years to Maturity
- Coupon Frequency (Annual/Semi-Annual)

### ResultsSummary

Displays calculated bond metrics in card format:

- Current Yield
- Yield to Maturity (YTM)
- Total Interest
- Bond Status

### CashFlowTable

Shows a detailed schedule of all coupon payments and principal repayment with dates and cumulative interest.

## API Integration

The frontend connects to the backend API at `http://localhost:3000/bond/calculate` to perform bond yield calculations.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Browser Support

Works on all modern browsers that support ES2023 and React 19.
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
globalIgnores(['dist']),
{
files: ['**/*.{ts,tsx}'],
extends: [
// Other configs...
// Enable lint rules for React
reactX.configs['recommended-typescript'],
// Enable lint rules for React DOM
reactDom.configs.recommended,
],
languageOptions: {
parserOptions: {
project: ['./tsconfig.node.json', './tsconfig.app.json'],
tsconfigRootDir: import.meta.dirname,
},
// other options...
},
},
])

```

```
