import { useState, useRef, useEffect } from "react";
import BondForm from "./components/BondForm";
import ResultsSummary from "./components/ResultsSummary";
import CashFlowTable from "./components/CashFlowTable";
import { calculateBond } from "./api/bondApi";
import type { BondInput, BondResult } from "./types/bond.types";

// main application component for bond yield calculator
function App() {
  // state for calculation results
  const [result, setResult] = useState<BondResult | null>(null);
  // ref to scroll to results container
  const resultsRef = useRef<HTMLDivElement>(null);
  // state for loading indicator during API call
  const [isLoading, setIsLoading] = useState(false);
  // state for error messages
  const [error, setError] = useState<string | null>(null);

  // handles form submission and API call to calculate bond yields
  const handleCalculate = async (data: BondInput) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      // call API with bond input data
      const response = await calculateBond(data);
      // store results for display
      setResult(response);
    } catch (err) {
      // capture error message for display
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      // always stop loading indicator
      setIsLoading(false);
    }
  };

  // scroll to results when they appear
  useEffect(() => {
    if (result && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [result]);

  return (
    <div className="bg-blue-100 min-h-screen py-8 px-4">
      {/* full page wrapper with background */}
      {/* centered content container */}
      <div className="max-w-4xl mx-auto">
        {/* page header with title */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Bond Yield Calculator</h1>
          <p className="text-lg text-gray-700">Calculate yields, analysis, and cash flows for bonds</p>
        </div>

        {/* display error message if any error occurs */}
        {error && <div className="bg-red-100 border border-red-300 text-red-600 p-4 rounded-lg mb-6 text-sm">❌ Error: {error}</div>}

        {/* form and results stacked vertically */}
        <div className="space-y-8">
          {/* bond input form component */}
          <div>
            <BondForm onSubmit={handleCalculate} isLoading={isLoading} />
          </div>

          {/* show results only after successful calculation */}
          {result && (
            <div ref={resultsRef}>
              <ResultsSummary result={result} />
              <div className="mt-8">
                <CashFlowTable schedule={result.cashFlowSchedule} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default App;
