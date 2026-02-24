import React from "react";
import type { BondResult } from "../types/bond.types";

interface ResultsSummaryProps {
  result: BondResult;
}

const ResultsSummary: React.FC<ResultsSummaryProps> = ({ result }) => {
  // determine status card styling based on bond status
  const getStatusCardClasses = () => {
    switch (result.status) {
      case "PREMIUM":
        return "bg-red-100 border-l-red-600";
      case "DISCOUNT":
        return "bg-green-100 border-l-green-600";
      case "PAR":
        return "bg-blue-100 border-l-blue-600";
      default:
        return "border-l-gray-400";
    }
  };

  // determine status text color class
  const getStatusTextClass = () => {
    switch (result.status) {
      case "PREMIUM":
        return "text-red-600";
      case "DISCOUNT":
        return "text-green-600";
      case "PAR":
        return "text-blue-600";
      default:
        return "";
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Results</h2>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-l-blue-600">
          <div className="text-xs text-gray-500 mb-1 font-medium">Current Yield</div>
          <div className="text-2xl font-bold text-gray-900">{result.currentYield}%</div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-l-green-600">
          <div className="text-xs text-gray-500 mb-1 font-medium">Yield to Maturity (YTM)</div>
          <div className="text-2xl font-bold text-gray-900">{result.ytm}%</div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-l-purple-600">
          <div className="text-xs text-gray-500 mb-1 font-medium">Total Interest Earned</div>
          <div className="text-2xl font-bold text-gray-900">${result.totalInterest.toFixed(2)}</div>
        </div>

        <div className={`rounded-lg shadow-md p-4 border-l-4 ${getStatusCardClasses()}`}>
          <div className="text-xs font-medium mb-1 text-gray-700">Bond Status</div>
          <div className={`text-xl font-bold ${getStatusTextClass()}`}>{result.status}</div>
        </div>
      </div>
    </div>
  );
};

export default ResultsSummary;
