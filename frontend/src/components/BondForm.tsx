import React, { useState, ChangeEvent, FormEvent } from "react";
import type { BondInput } from "../types/bond.types";

// props interface for the BondForm component
interface BondFormProps {
  // called when user submits the form with bond data
  onSubmit: (data: BondInput) => void;
  // indicates if a calculation is currently in progress
  isLoading: boolean;
}

// React component for bond input form with validation and styling
const BondForm: React.FC<BondFormProps> = ({ onSubmit, isLoading }) => {
  // form state initialized with empty values
  const [formData, setFormData] = useState<BondInput>({
    faceValue: 0,
    couponRate: 0,
    marketPrice: 0,
    yearsToMaturity: 0,
    couponFrequency: "annual",
  });

  // updates form state when user changes any input or select field
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      // couponFrequency is a string, other fields are numbers
      [name]: name.includes("Frequency") ? value : parseFloat(value) || value,
    }));
  };

  // handles form submission by preventing default behavior and calling onSubmit callback
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* form header with title and description */}
      <h1 className="text-lg font-bold text-gray-900 mb-1">Enter bond details to calculate yields</h1>
      <p className="text-xs text-gray-500 mb-4"></p>
      {/* form element with submit handler */}
      <form onSubmit={handleSubmit}>
        {/* face value input field */}
        <div className="mb-4">
          <label htmlFor="faceValue" className="block text-sm font-medium text-gray-700 mb-2">
            Face Value
          </label>
          <input
            id="faceValue"
            type="number"
            name="faceValue"
            value={formData.faceValue}
            onChange={handleChange}
            min="0"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {/* annual coupon rate input field (0-100%) */}
        <div className="mb-4">
          <label htmlFor="couponRate" className="block text-sm font-medium text-gray-700 mb-2">
            Annual Coupon Rate (%)
          </label>
          <input
            id="couponRate"
            type="number"
            name="couponRate"
            value={formData.couponRate}
            onChange={handleChange}
            min="0"
            max="100"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {/* current market price input field */}
        <div className="mb-4">
          <label htmlFor="marketPrice" className="block text-sm font-medium text-gray-700 mb-2">
            Market Price
          </label>
          <input
            id="marketPrice"
            type="number"
            name="marketPrice"
            value={formData.marketPrice}
            onChange={handleChange}
            min="0"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {/* years until bond maturity input field */}
        <div className="mb-4">
          <label htmlFor="yearsToMaturity" className="block text-sm font-medium text-gray-700 mb-2">
            Years to Maturity
          </label>
          <input
            id="yearsToMaturity"
            type="number"
            name="yearsToMaturity"
            value={formData.yearsToMaturity}
            onChange={handleChange}
            min="1"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {/* coupon frequency select field (annual or semi-annual) */}
        <div className="mb-4">
          <label htmlFor="couponFrequency" className="block text-sm font-medium text-gray-700 mb-2">
            Coupon Frequency
          </label>
          <select
            id="couponFrequency"
            name="couponFrequency"
            value={formData.couponFrequency}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
            <option value="annual">Annual</option>
            <option value="semi-annual">Semi-Annual</option>
          </select>
        </div>

        {/* submit button with loading state */}
        <button
          type="submit"
          className="w-full py-2 mt-4 bg-purple-600 text-white border-none rounded font-medium cursor-pointer hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {/* show different text based on loading state */}
          {isLoading ? "Calculating..." : "Calculate Yield"}
        </button>
      </form>
    </div>
  );
};

export default BondForm;
